import { ReactElement } from "react";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  categories: string[];
}

export interface SerializedPost extends Omit<Post, 'content'> {
  content: ReactElement;
}

export interface PostListProps {
  posts: Post[];
  category: string;
}