import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { Post } from "@/_lib/_interface/post"

const postsDirectory = path.join(process.cwd(), '_posts')

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getAllPosts() : Post[] {
  const posts = getAllPostsRecursive(postsDirectory);
  return posts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

export async function getPostBySlug(slug: string) : Promise<Post> {
  const files = getAllPosts();
  const post = files.find(file => file.slug === slug);

  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }

  const mdxSource = await serialize(post.content as string);

  return {
    ...post,
    content: mdxSource,
  };
}

export function searchPosts(searchTerm: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => {
    const contentString = typeof post.content === 'string' ? post.content : JSON.stringify(post.content);
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            || contentString.toLowerCase().includes(searchTerm.toLowerCase());
  });
}