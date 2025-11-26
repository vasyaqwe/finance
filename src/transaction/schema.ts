import { integer, text, timestamp } from "drizzle-orm/pg-core"
import { CATEGORIES } from "@/category/constants"
import { CURRENCIES } from "@/currency/constants"
import { id, table, timestamps } from "@/database/utils"
import { TRANSACTION_TYPES } from "@/transaction/constants"

export const transaction = table("transaction", {
   id,
   cardNumber: text().notNull(),
   currency: text({ enum: CURRENCIES }).notNull(),
   amount: integer().notNull(),
   date: timestamp().notNull(),
   description: text(),
   category: text({ enum: CATEGORIES }).notNull(),
   type: text({ enum: TRANSACTION_TYPES }).notNull(),
   importId: text().unique(),
   ...timestamps,
})
