import * as z from "zod"
import { CURRENCIES } from "@/currency/constants"

export const transactionListInputSchema = z.object({
   month: z.string(),
})

export const transactionStatsInputSchema = z.object({
   month: z.string(),
   currency: z.enum(CURRENCIES),
})
