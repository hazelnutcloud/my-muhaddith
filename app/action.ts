import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import { inArray } from "drizzle-orm";
import * as chromaSchema from "@/schema/chroma";
import { getChromaClient } from "@/utils/chroma";
import { IncludeEnum } from "chromadb";

const GET_DATA = async (formData: FormData) => {
  "use server";
  try {
    // TURSO INITIALIZE
    const libsql = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_TOKEN!,
    });
    const db = drizzle(libsql, { schema });

    // CHROMA
    const chromaClient = getChromaClient();

    // INPUT
    const query = formData.get("search") as string;
    const limit = 10;

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

    const display = ids.map((id, i) => {
      const hadith = hadiths.find((h) => h.id === id)!;
      return {
        relevanceScore: results.distances?.[0][i]!,
        collection: hadith.collection,
        book: hadith.book,
        hadith: hadith.hadith,
        reference: hadith.reference,
      };
    });

    console.table(display);
    return display;
  } catch (error) {
    console.error(error);
    return;
  }
};

export default { GET_DATA };
