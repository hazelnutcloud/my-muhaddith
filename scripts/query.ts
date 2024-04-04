import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import * as chromaSchema from "@/schema/chroma";
import { fileURLToPath } from "node:url";
import { getChromaClient } from "@/utils/chroma";
import { inArray } from "drizzle-orm";
import { IncludeEnum } from "chromadb";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
  });
  const db = drizzle(libsql, { schema });
  const chromaClient = getChromaClient();

  const query = process.argv[2];
  const limit = process.argv[3] ? parseInt(process.argv[3]) : 10;

  const collection = await chromaClient.getCollection(chromaSchema.hadiths);

  const results = await collection.query({
    queryTexts: [query],
    nResults: limit,
    include: [IncludeEnum.Distances],
  });

  const ids = results.ids[0]
    .map((id) => id.split(":")[0])
    .reduce((acc, id) => {
      if (!acc.includes(id)) {
        acc.push(id);
      }
      return acc;
    }, [] as string[]);

  const hadiths = await db.query.hadiths.findMany({
    where: inArray(schema.hadiths.id, ids),
  });

  const display = ids
    .map((id, i) => {
      const hadith = hadiths.find((h) => h.id === id)!;
      return {
        relevanceScore: results.distances?.[0][i]!,
        collection: hadith.collection,
        book: hadith.book,
        hadith: hadith.hadith,
        reference: hadith.reference,
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  console.table(display);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
