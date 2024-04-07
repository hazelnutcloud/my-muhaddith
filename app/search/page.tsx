import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import { inArray } from "drizzle-orm";
import * as chromaSchema from "@/schema/chroma";
import { getChromaClient } from "@/utils/chroma";
import { IncludeEnum } from "chromadb";

async function getData() {
  try {
    const libsql = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_TOKEN!,
    });

    console.log("tada : ", libsql);

    const db = drizzle(libsql, { schema });
    console.log(db);

    const hadiths = await db.query.hadiths.findMany({
      where: inArray(schema.hadiths.id, ["hadith_klbibn95896swidzbgizhcok"]),
    });

    console.log(hadiths);
    // --------------------------------------------- Line ni issue 
    // const chromaClient = getChromaClient();

    // const query = "manner in eating";
    // const limit = 10;

    // const collection = await chromaClient.getCollection(chromaSchema.hadiths);

    // const results = await collection.query({
    //   queryTexts: [query],
    //   nResults: limit,
    //   include: [IncludeEnum.Distances],
    // });

    // console.log(results);
  } catch (error) {
    console.error(error);
    return;
  }
}

const page = async () => {
  await getData();
  return <div>page</div>;
};

export default page;
