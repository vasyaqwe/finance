import { and, asc, desc, gte, lte, ne, type SQL } from "drizzle-orm"
import * as XLSX from "xlsx"
import type z from "zod"
import type { Category } from "@/category/types"
import { getExchangeRates } from "@/currency/exchange"
import type { Currency } from "@/currency/types"
import { db } from "@/database/client"
import type {
   transactionListInputSchema,
   transactionStatsInputSchema,
} from "@/transaction/filter"
import { transaction } from "@/transaction/schema"
import type { TransactionType } from "@/transaction/types"
import { dateRangeFromMonth, generateHash } from "@/transaction/utils"

export const transactionFirst = async () => {
   const [first] = await db
      .select({ date: transaction.date })
      .from(transaction)
      .orderBy(asc(transaction.date))
      .limit(1)

   return first
}

export const transactionCashflow = async () => {
   const rates = await getExchangeRates("USD")
   if (!rates) throw new Error("Rates not found")

   const startDate = new Date(0)

   const rows = await db
      .select({
         amount: transaction.amount,
         date: transaction.date,
         type: transaction.type,
         currency: transaction.currency,
      })
      .from(transaction)
      .where(
         and(
            ne(transaction.type, "Transfer"),
            gte(transaction.date, startDate),
         ),
      )

   const dailyMap = new Map<string, { income: number; expense: number }>()

   for (const row of rows) {
      const rate = rates[row.currency]
      const safeRate = rate === 0 ? 1 : rate
      const amountInTarget = Math.round(row.amount / safeRate)

      const d = new Date(row.date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const dateKey = `${year}-${month}-01`

      if (!dailyMap.has(dateKey)) {
         dailyMap.set(dateKey, { income: 0, expense: 0 })
      }
      const entry = dailyMap.get(dateKey)!

      const type = row.type.toLowerCase()
      if (type === "income") {
         entry.income += amountInTarget
      } else if (type === "expense") {
         entry.expense += Math.abs(amountInTarget)
      }
   }

   return Array.from(dailyMap.entries())
      .map(([date, vals]) => ({
         date,
         income: vals.income / 100,
         expense: vals.expense / 100,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
}

export const transactionList = async (
   input: z.infer<typeof transactionListInputSchema>,
) => {
   const range = dateRangeFromMonth(input.month)

   const whereConditions: (SQL | undefined)[] = [
      ne(transaction.type, "Transfer"),
      gte(transaction.date, range.currentStart),
      lte(transaction.date, range.currentEnd),
   ]

   return await db.query.transaction.findMany({
      where: and(...whereConditions),
      orderBy: [desc(transaction.date)],
   })
}

export const transactionStats = async (
   input: z.infer<typeof transactionStatsInputSchema>,
) => {
   const range = dateRangeFromMonth(input.month)

   const whereConditions: (SQL | undefined)[] = [
      ne(transaction.type, "Transfer"),
      gte(transaction.date, range.currentStart),
      lte(transaction.date, range.currentEnd),
   ]

   const rates = await getExchangeRates(input.currency)
   if (!rates) throw new Error("Rates not found")

   const stats = await db
      .select({
         currency: transaction.currency,
         type: transaction.type,
         amount: transaction.amount,
      })
      .from(transaction)
      .where(and(...whereConditions))

   const totals = {
      income: 0,
      expense: 0,
   }

   for (const row of stats) {
      const rate = rates[row.currency]
      const safeRate = rate === 0 ? 1 : rate

      const amountInTarget =
         row.currency === input.currency
            ? row.amount
            : Math.round(row.amount / safeRate)

      const type = row.type.toLowerCase()

      if (type === "income") totals.income += amountInTarget
      if (type === "expense") totals.expense += amountInTarget
   }

   return {
      income: totals.income / 100,
      expense: totals.expense / 100,
   }
}

export const transactionDelete = async () => {
   await db.delete(transaction)
}

export const parseStatement = async (file: File) => {
   const arrayBuffer = await file.arrayBuffer()
   const buffer = new Uint8Array(arrayBuffer)

   const workbook = XLSX.read(buffer, { type: "array" })

   const firstSheetName = workbook.SheetNames[0]
   if (!firstSheetName) throw new Error("No sheets found")

   const worksheet = workbook.Sheets[firstSheetName]
   if (!worksheet) throw new Error("No worksheet found")

   const rows = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
   }) as string[][]

   const promises = rows.map(async (row) => {
      const [dateStr, category, cardNumber, description, amount, currency] = row

      if (!category || !dateStr || !cardNumber || !amount) return null

      const amountCents = Math.round(parseFloat(amount) * 100)
      const combinedText = `${category} ${description}`.toLowerCase()

      const isInternalTransfer =
         combinedText.includes("my card") ||
         combinedText.includes("your accounts") ||
         combinedText.includes("exchange") ||
         combinedText.includes("переказ на свою картку") ||
         combinedText.includes("cash desk") ||
         combinedText.includes("splata paiovoho")

      let type: TransactionType

      if (isInternalTransfer) {
         type = "Transfer"
      } else if (amountCents > 0) {
         type = "Income"
      } else {
         type = "Expense"
      }

      // parse date (DD.MM.YYYY HH:mm:ss -> Date Object)
      const [d, t] = dateStr.split(" ")
      if (!d || !t) return null

      const [day, month, year] = d.split(".")
      const isoDate = new Date(`${year}-${month}-${day}T${t}`)

      return {
         cardNumber,
         currency: currency as Currency,
         amount: amountCents,
         date: isoDate,
         description,
         category: category as Category,
         importId: await generateHash(`${dateStr}${amount}${row[8] || ""}`),
         type,
      }
   })

   const results = await Promise.all(promises)
   return results.filter((t) => t !== null && t !== undefined)
}

export const transactionImport = async (file: File) => {
   const transactions = await parseStatement(file)

   await db
      .insert(transaction)
      .values(transactions)
      .onConflictDoNothing({ target: transaction.importId })
}
