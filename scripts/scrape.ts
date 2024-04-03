import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import * as chromaSchema from "@/schema/chroma";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { ChromaClient } from "chromadb";

async function main() {
  const libsql = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
  });
  const db = drizzle(libsql, { schema });

  const chromaClient = new ChromaClient();
  const hadithsCollection = chromaClient.getCollection({
    name: chromaSchema.hadiths.name,
  });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // bukhari - 97 books
  for (let i = 1; i <= 97; i++) {
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
              // TODO: Create embeddings
            }
          } else if (child.classList.contains("actualHadithContainer")) {
            const hadith: typeof schema.hadiths.$inferInsert = {
              collection: "Sahih Al-Bukhari",
              book: book,
              grade: "Sahih",
              reference: url,
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
    await db.insert(schema.hadiths).values(hadiths);
  }

  await context.close();
  await browser.close();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
