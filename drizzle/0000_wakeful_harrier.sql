CREATE TABLE `hadiths` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE VIRTUAL TABLE `vss_hadiths` USING vss0(
  content_embedding(1024)
);