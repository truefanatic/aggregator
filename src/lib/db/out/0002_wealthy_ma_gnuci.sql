ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_user_id_feed_id_pk";--> statement-breakpoint
ALTER TABLE "feed_follows" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_user_feed_unique" UNIQUE("user_id","feed_id");