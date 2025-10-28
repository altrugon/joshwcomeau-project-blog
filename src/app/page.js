import React from "react";

import { getBlogPostList } from "@/helpers/file-helpers";
import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      <React.Suspense fallback={"Loading..."}>
        <BlogPostList />
      </React.Suspense>
    </div>
  );
}

async function BlogPostList() {
  const blogPosts = await getBlogPostList();

  return blogPosts.map((post) => (
    <BlogSummaryCard
      key={post.slug}
      slug={post.slug}
      title={post.title}
      abstract={post.abstract}
      publishedOn={new Date(post.publishedOn)}
    />
  ));
}

export default Home;
