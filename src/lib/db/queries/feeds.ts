import { db } from "..";
import { eq } from "drizzle-orm";
import { feeds } from "../schema/schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [feed] = await db
    .insert(feeds)
    .values({
      name,
      url,
      userId,
    })
    .returning();
  return feed;
}

export async function getFeeds() {
  const result = await db.select().from(feeds);
  return result;
}

export async function urlSearchFeed(url: string) {
  const [result] = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url));
  return result;
}


async function markFeedFetched(feedId: string) {
  const [result] = await db
    .update(feeds)
    .set({lastFetchedAt: new Date, updatedAt: new Date})
    .where(eq(feeds.id, feedId));
  return result;
}