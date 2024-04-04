import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import * as chromaSchema from "@/schema/chroma";
import { migrate } from "drizzle-orm/libsql/migrator";
import { fileURLToPath } from "node:url";
import { getChromaClient } from "@/utils/chroma";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
  });
  const db = drizzle(libsql, { schema });
  const chromaClient = getChromaClient();

  await migrate(db, { migrationsFolder: "./drizzle" });

  for (const collection of Object.values(chromaSchema)) {
    await chromaClient.getOrCreateCollection({ name: collection.name });
  }

  console.log("Migration complete");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
