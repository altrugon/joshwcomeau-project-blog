import { headers } from "next/headers";
import RSS from "rss";

import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

async function createRSS() {
  const headersList = await headers();
  const host = headersList.get("host");

  const feedOptions = {
    title: BLOG_TITLE,
    description: "A wonderful blog about JavaScript",
    feed_url: `http://${host}/rss.xml`,
    site_url: `http://${host}`,
  };
  const feed = new RSS(feedOptions);

  const blogPosts = await getBlogPostList();

  blogPosts.map((blogPost) => {
    feed.item({
      title: blogPost.title,
      description: blogPost.abstract,
      url: `http://${host}/${blogPost.slug}`,
      date: blogPost.publishedOn,
    });
  });

  return feed.xml();
}

export async function GET() {
  const xmlContent = await createRSS();

  return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}
