CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'USER' NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
CREATE TABLE `resonator_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`resonator_id` text NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_assets_unique` ON `resonator_assets` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonators` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`weapon_type` text NOT NULL,
	`rarity` text NOT NULL,
	`element` text NOT NULL,
	`role` text NOT NULL,
	`is_new` integer DEFAULT false NOT NULL,
	`is_public` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `resonator_skills_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`resonator_id` text NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonator_skills`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_skills_assets_unique` ON `resonator_skills_assets` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonator_skills` (
	`id` text PRIMARY KEY NOT NULL,
	`resonator_id` text NOT NULL,
	`name` text NOT NULL,
	`image_url` text NOT NULL,
	`description` text NOT NULL,
	`skill_type` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_skills_resonator_id_order` ON `resonator_skills` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonator_sequences_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`resonator_id` text NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonator_sequences`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_sequences_assets_unique` ON `resonator_sequences_assets` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonator_sequences` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`level` integer NOT NULL,
	`order` integer NOT NULL,
	`resonator_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_sequences_resonator_id_order` ON `resonator_sequences` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonator_bonus_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`resonator_id` text NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonator_bonuses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_bonuses_assets_unique` ON `resonator_bonus_assets` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `resonator_bonuses` (
	`id` text PRIMARY KEY NOT NULL,
	`resonator_id` text NOT NULL,
	`bonus_type` text NOT NULL,
	`bonus_value` text NOT NULL,
	`bonus_value_number` real NOT NULL,
	`bonus_title` text NOT NULL,
	`image_url` text NOT NULL,
	`bonus_description` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `resonator_levels` (
	`id` text PRIMARY KEY NOT NULL,
	`resonator_id` text NOT NULL,
	`level_value` text NOT NULL,
	`atk` integer NOT NULL,
	`hp` integer NOT NULL,
	`def` integer NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_levels_resonator_id_order` ON `resonator_levels` (`resonator_id`,`order`);--> statement-breakpoint
CREATE TABLE `weapon_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`weapon_id` text NOT NULL,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weapon_assets_unique` ON `weapon_assets` (`weapon_id`,`order`);--> statement-breakpoint
CREATE TABLE `weapons` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`type` text NOT NULL,
	`main_stat_value` text NOT NULL,
	`rarity` text NOT NULL,
	`is_new` integer DEFAULT false NOT NULL,
	`is_public` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weapons_refinaments` (
	`id` text PRIMARY KEY NOT NULL,
	`weapon_id` text NOT NULL,
	`refinament_value` text NOT NULL,
	`refinament_description` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weapons_refinaments_weapon_id_order` ON `weapons_refinaments` (`weapon_id`,`order`);--> statement-breakpoint
CREATE TABLE `weapon_additional_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`weapon_id` text NOT NULL,
	`refinament_id` text,
	`stat_value` text NOT NULL,
	`stat_value_number` integer NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`refinament_id`) REFERENCES `weapons_refinaments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weapon_additional_stats_weapon_order_id` ON `weapon_additional_stats` (`weapon_id`,`refinament_id`,`order`);--> statement-breakpoint
CREATE TABLE `weapon_levels` (
	`id` text PRIMARY KEY NOT NULL,
	`weapon_id` text NOT NULL,
	`level_value` text NOT NULL,
	`atk` real NOT NULL,
	`main_stat_number` real NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE cascade
);
