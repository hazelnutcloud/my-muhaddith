CREATE TABLE `hadiths` (
	`id` text PRIMARY KEY NOT NULL,
	`collection` text,
	`book` text,
	`hadith` text,
	`grade` text,
	`arabic` text,
	`english` text,
	`reference` text,
	`created_at` integer,
	`updated_at` integer
);
