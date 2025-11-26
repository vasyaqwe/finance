import { integer, pgTable, timestamp } from "drizzle-orm/pg-core"

export const table = pgTable

export const id = integer().primaryKey().generatedAlwaysAsIdentity()

export const timestamps = {
   createdAt: timestamp()
      .$defaultFn(() => new Date())
      .notNull(),
   updatedAt: timestamp()
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date()),
}
