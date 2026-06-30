CREATE TABLE `echo_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`echo_id` text NOT NULL,
	FOREIGN KEY (`echo_id`) REFERENCES `echoes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `echo_assets_unique` ON `echo_assets` (`echo_id`,`order`);--> statement-breakpoint
CREATE TABLE `echo_sonatas` (
	`id` text PRIMARY KEY NOT NULL,
	`echo_id` text NOT NULL,
	`echo_sonata_value` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`echo_id`) REFERENCES `echoes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `echoes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description_skill` text NOT NULL,
	`echo_class` text NOT NULL,
	`echo_cost` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
