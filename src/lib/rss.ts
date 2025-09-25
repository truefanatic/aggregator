import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml",
    },
  });
  if (!response.ok) {
    throw new Error(
      `failed to fetch feed: ${response.status} ${response.statusText}`
    );
  }
  const xml = await response.text();
  const xmlParser = new XMLParser();
  const jsonFeed = xmlParser.parse(xml);
  const channel = jsonFeed.rss?.channel;
  if (!channel) {
    throw new Error("Failed to parse channel!");
  }
  if (
    !channel ||
    !channel.title ||
    !channel.link ||
    !channel.description ||
    !channel.item
  ) {
    throw new Error("Failed to parse channel!");
  }
  const items: RSSItem[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];


  channel.item.forEach((item: RSSItem) => {
    if (item.title && item.link && item.description && item.pubDate) {
      const article: RSSItem = {
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
      };
      items.push(article);
    }
  });

  const rss: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: items,
    },
  };
  return rss;
};

export function createFeed() {
    
};