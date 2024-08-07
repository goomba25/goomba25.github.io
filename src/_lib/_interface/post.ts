import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Post {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  content: string | MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
  categories: string[];
}