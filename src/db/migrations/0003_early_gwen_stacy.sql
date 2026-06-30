CREATE TABLE `resonator_best_weapons` (
	`id` text PRIMARY KEY NOT NULL,
	`resonator_id` text NOT NULL,
	`weapon_id` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`resonator_id`) REFERENCES `resonators`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resonator_best_weapons_resonator_id_order` ON `resonator_best_weapons` (`resonator_id`,`weapon_id`,`order`);