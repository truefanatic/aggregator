import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import { createFeedFollow } from "src/lib/db/queries/feed-follows";
import { Feed, User } from "src/lib/db/schema/schema";
import { getUserById } from "../lib/db/queries/users";
import { printFeedFollow } from "./feed-follows";


export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }
  const feedName = args[0];
  const urlFeed = args[1];
  const feed = await createFeed(feedName, urlFeed, user.id);
  if (!feed) {
    throw new Error(`Failed to create feed`);
  }
  const feedFollow = await createFeedFollow(feed.id, user.id);
  printFeedFollow(user.name, feedFollow.feedName);
  console.log("Feed created successfully:");
  printFeed(feed, user);
}


export async function handlerFeeds(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  const feeds = await getFeeds();
  if (feeds.length === 0) {
    console.log(`No feeds found.`);
    return;
  }
  console.log(`Found %d feeds:\n`, feeds.length);
  for (let feed of feeds) {
    const user = await getUserById(feed.userId);
    printFeed(feed, user);
    console.log(`=====================================`);
  }
}


function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
