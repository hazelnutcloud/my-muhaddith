import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import * as chromaSchema from "@/schema/chroma";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { ChromaClient } from "chromadb";
import { getChromaClient, split } from "@/utils/chroma";
import { and, eq } from "drizzle-orm";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
  });
  const db = drizzle(libsql, { schema });

  const chromaClient = getChromaClient();
  const hadithsCollection = await chromaClient.getCollection({
    name: chromaSchema.hadiths.name,
    embeddingFunction: chromaSchema.hadiths.embeddingFunction,
  });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // bukhari - 97 books
  const collection = "Sahih Al-Bukhari";
  for (let i = 54; i <= 97; i++) {
    const url = `https://sunnah.com/bukhari/${i}`;
    await page.goto(url);
    console.log("scraping ", url);

    const hadiths = await page.evaluate(
      ([book, url]) => {
        const hadithContainer = document.querySelector(".AllHadith");
        if (!hadithContainer) return [];

        const hadiths: (typeof schema.hadiths.$inferInsert)[] = [];

        let chapter = "";
        for (const child of Array.from(hadithContainer.children)) {
          if (child.classList.contains("chapter")) {
            const englishChapter = child
              .querySelector(".englishchapter")
              ?.textContent?.split("Chapter: ")[1];
            if (englishChapter) {
              chapter = englishChapter;
            }
          } else if (child.classList.contains("actualHadithContainer")) {
            const hadith: typeof schema.hadiths.$inferInsert = {
              collection,
              book: book,
              grade: "Sahih",
              reference: url,
              metadata: { chapter },
              hadith: (hadiths.length + 1).toString(),
              english: child.querySelector<HTMLElement>(".english_hadith_full")
                ?.innerText,
              arabic: child.querySelector<HTMLElement>(".arabic_hadith_full")
                ?.innerText,
            };

            hadiths.push(hadith);
          }
        }

        return hadiths;
      },
      [i.toString(), url]
    );

    await db
      .insert(schema.hadiths)
      .values(hadiths)
      .onConflictDoNothing({
        target: [
          schema.hadiths.collection,
          schema.hadiths.book,
          schema.hadiths.hadith,
        ],
      });

    const insertedHadiths = await db.query.hadiths.findMany({
      where: and(
        eq(schema.hadiths.collection, collection),
        eq(schema.hadiths.book, i.toString())
      ),
    });

    const ids: string[] = [];
    const documents: string[] = [];

    for (const hadith of insertedHadiths) {
      const text = `${hadith.metadata?.chapter} - ${hadith.english}`;
      const splitted = await split(text, 4000);
      ids.push(...splitted.map((_, i) => `${hadith.id}:${i}`));
      documents.push(...splitted);
    }

    const res = await hadithsCollection.add({
      ids,
      documents,
    });

    console.log("Inserted rows and embeddings", res);
  }

  await context.close();
  await browser.close();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
