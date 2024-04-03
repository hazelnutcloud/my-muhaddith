import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const hadiths = sqliteTable("hadiths", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `hadith_${createId()}`),
  content: text("content").notNull(),
  metadata: text("metadata", { mode: "json" }),
});
