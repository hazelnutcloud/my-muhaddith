import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema"
import { fileURLToPath } from "node:url";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!
  })
  const db = drizzle(libsql, { schema })

  
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}