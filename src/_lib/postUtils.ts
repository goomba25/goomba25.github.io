import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { Post, SerializedPost } from "@/_lib/_interface/post"

const postsDirectory = path.join(process.cwd(), '_posts')

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getAllPosts() : Post[] {
  const posts = getAllPostsRecursive(postsDirectory);
  return posts.sort((a,b) => {
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime()

    if (dateComparison === 0) {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
    }

    return dateComparison;
  });
}

function getAllPostsRecursive(dir: string) : Post[] {
  const files = fs.readdirSync(dir);
  let posts: Post[] = []

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      posts = posts.concat(getAllPostsRecursive(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, '');

      posts.push({
        slug,
        title: data.title,
        date: data.date ? formatDate(new Date(data.date)) : '',
        excerpt: data.excerpt || '',
        content,
        categories: data.categories || [],
      });
    }
  })

  return posts;
}

export function getPostsByCategory(category: string) : Post[] {
  return getAllPosts().filter(post => post.categories.includes(category));
}

export async function getPostBySlug(category: string, slug: string) : Promise<SerializedPost> {
  const files = getAllPosts();
  const post = files.find(p => p.slug === slug && p.categories.includes(category));

  if (!post) {
    throw new Error(`Post with slug ${slug} in category ${category} not found`);
  }

  const { content } = await compileMDX<{ title: string }>({
    source: post.content,
    options: { parseFrontmatter: true }
  });

  return {
    ...post,
    content,
  };
}