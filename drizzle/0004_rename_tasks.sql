ALTER TABLE "shopping_items" RENAME TO "tasks";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "todo" TO "title";--> statement-breakpoint
ALTER INDEX "shopping_items_user_id_position_idx" RENAME TO "tasks_user_id_position_idx";--> statement-breakpoint
ALTER INDEX "shopping_items_user_id_changed_on_idx" RENAME TO "tasks_user_id_changed_on_idx";--> statement-breakpoint
ALTER TABLE "tasks" RENAME CONSTRAINT "shopping_items_user_id_user_id_fk" TO "tasks_user_id_user_id_fk";
