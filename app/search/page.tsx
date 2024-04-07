export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
import Hero from "@/components/Hero";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/schema/drizzle";
import { inArray } from "drizzle-orm";
import * as chromaSchema from "@/schema/chroma";
import { getChromaClient } from "@/utils/chroma";
import { IncludeEnum } from "chromadb";

import { redirect } from "next/navigation";
import Link from "next/link";

interface hadith {
  relevanceScore: number;
  collection: string;
  book: string;
  hadith_number: string;
  hadith_arabic: string;
  hadith_ar: string;
  hadith_en: string;
  grade: string;
  reference: string;
  chapter: string;
}

const GET_DATA = async (query: string) => {
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
        chapter: hadith.metadata?.chapter,
        relevanceScore: results.distances?.[0][i]!,
        collection: hadith.collection,
        book: hadith.book,
        hadith_ar: hadith.arabic,
        hadith_en: hadith.english,
        hadith_number: hadith.hadith,
        grade: hadith.grade,
        reference: hadith.reference,
      };
    });

    return display || [];
  } catch (error) {
    console.error(error);
    return;
  }
};

const page = async ({ searchParams }: PageProps) => {
  const query = searchParams.query;

  if (Array.isArray(query) || !query) {
    return redirect("/");
  }

  const display = await GET_DATA(query);
  return (
    <div className="">
      <Hero />
      <div className="flex justify-center py-16 bg-primary-blue text-primary-white">
        <div className="flex flex-col gap-10 w-[900px] px-4">
          {display?.map((hadith, i) => (
            <div
              key={i}
              className="flex flex-col p-6 space-y-8 border border-gray-700 rounded-lg"
            >
              {/* Header */}
              <div className="flex flex-col justify-between py-4 border-b border-gray-400 lg:flex-row">
                <p className="flex-1 ">{hadith.chapter}</p>

                <p>
                  <span className="text-gray-500">Book</span> {hadith.book} |{" "}
                  <span className="text-gray-500">Number</span>{" "}
                  {hadith.hadith_number}
                </p>
              </div>

              {/* Hadith */}
              <div className="space-y-6 text-sm font-thin tracking-wide">
                <p className="flex flex-col gap-2">
                  {hadith.hadith_en?.split(":").map((part, index) => (
                    <span key={index}>{part}</span>
                  ))}
                </p>
                <p className="leading-loose text-right text-primary-white/60">
                  {hadith.hadith_ar}
                </p>
              </div>

              {/* Scholar */}
              <div className="flex justify-between">
                <Link
                  href={hadith.reference || ""}
                  target="_blank"
                  className="text-sm underline text-highlight/70 underline-offset-2"
                >
                  source
                </Link>
                <p>
                  {hadith.collection} |{" "}
                  <span className="text-gray-400">{hadith.grade}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
