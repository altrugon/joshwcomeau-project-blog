import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

import { loadBlogPost } from "@/helpers/file-helpers";
import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import Spinner from "@/components/Spinner";

const CircularColorsDemo = dynamic(
  () => import("@/components/CircularColorsDemo"),
  {
    ssr: false,
    loading: Spinner,
  }
);

const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  {
    ssr: false,
    loading: Spinner,
  }
);

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={new Date(blogPost.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            CircularColorsDemo,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
