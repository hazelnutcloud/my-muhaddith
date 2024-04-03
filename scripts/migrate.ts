import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema"
import { migrate } from "drizzle-orm/libsql/migrator";
import { fileURLToPath } from "node:url";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!
  })
  const db = drizzle(libsql, { schema })
  await migrate(db, { migrationsFolder: './drizzle' })

  console.log("Migration complete")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}