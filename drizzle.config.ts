import { defineConfig } from "drizzle-kit"

const BASE = "./src/database"
const migrationsFolder = `${BASE}/migrations`

export default defineConfig({
   dialect: "postgresql",
   schema: `${BASE}/schema.ts`,
   out: migrationsFolder,
   verbose: false,
   migrations: { prefix: "timestamp" },
})

export { migrationsFolder }
