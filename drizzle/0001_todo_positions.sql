ALTER TABLE "shopping_items" ADD COLUMN "position" integer;--> statement-breakpoint
WITH ranked AS (
	SELECT
		"id",
		row_number() OVER (
			PARTITION BY "user_id"
			ORDER BY "changed_on" DESC, "id" ASC
		) - 1 AS "position"
	FROM "shopping_items"
)
UPDATE "shopping_items"
SET "position" = ranked."position"
FROM ranked
WHERE "shopping_items"."id" = ranked."id";--> statement-breakpoint
ALTER TABLE "shopping_items" ALTER COLUMN "position" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "shopping_items_user_id_position_idx" ON "shopping_items" USING btree ("user_id","position");
