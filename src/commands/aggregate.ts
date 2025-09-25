import { fetchFeed } from "../lib/rss";


export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  const urlFeed = "https://www.wagslane.dev/index.xml";
  const feed = await fetchFeed(urlFeed);
  console.log(JSON.stringify(feed, null, 2));
}