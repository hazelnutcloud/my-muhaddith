import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const hadiths = sqliteTable("hadiths", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `hadith_${createId()}`),
  collection: text("collection"),
  book: text("book"),
  hadith: text("hadith"),
  grade: text("grade"),
  arabic: text("arabic"),
  english: text("english"),
  reference: text("reference"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdateFn(
    () => new Date()
  ),
});
