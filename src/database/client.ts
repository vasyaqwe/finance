import { PGlite } from "@electric-sql/pglite"
import { PgDialect } from "drizzle-orm/pg-core/dialect"
import { drizzle } from "drizzle-orm/pglite"
import { env } from "@/env"
import migrations from "./migrations/export.json"
import * as schema from "./schema"

const DB_NAME = env.DEV ? "vasyaqwe_finance_dev" : "vasyaqwe_finance"

const client = new PGlite({ dataDir: `idb://${DB_NAME}` })

const _db = drizzle(client, {
   schema,
   // logger: env.DEV,
})

// prevent multiple schema migrations to be run
let isLocalDBSchemaSynced = false

if (!isLocalDBSchemaSynced) {
   const start = performance.now()
   try {
      // @ts-expect-error 🤷 don't know why db._.session is not a Session
      await new PgDialect().migrate(migrations, _db._.session, DB_NAME)
      isLocalDBSchemaSynced = true
      console.info(`✅ Local database ready in ${performance.now() - start}ms`)
   } catch (cause) {
      console.error("❌ Local database schema migration failed", cause)
      throw cause
   }
}

const db = Object.assign(_db, {
   schema,
})

export { db }
