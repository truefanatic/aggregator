import { urlSearchFeed } from "src/lib/db/queries/feeds";
import {
  createFeedFollow,
  deleteFeedFollow,
  getFeedFollowsForUser,
} from "src/lib/db/queries/feed-follows";

import { User } from "src/lib/db/schema/schema";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const urlFeed = args[0];
  const feed = await urlSearchFeed(urlFeed);
  const feedFol = await createFeedFollow(feed.id, user.id);
  console.log("Feed follow created:");
  printFeedFollow(feedFol.userName, feedFol.feedName);
}

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const urlFeed = args[0];
  const feed = await urlSearchFeed(urlFeed);
  if (!feed) {
    throw new Error(`Feed not found for url: ${urlFeed}`);
  }
   const result = await deleteFeedFollow(feed.id, user.id);
 if (!result) {
    throw new Error(`Failed to unfollow feed: ${urlFeed}`);
  }

  console.log(`%s unfollowed successfully!`, feed.name);
}

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  const feedFollows = await getFeedFollowsForUser(user);
  if (feedFollows.length === 0) {
    console.log(`No feed follows found for this user.`);
    return;
  }
  console.log(`Feed follows for user %s:`, user.id);
  for (const ff of feedFollows) {
    console.log(`* %s`, ff.feedname);
  }
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
