import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { Post } from "@/_lib/_interface/post"

const postsDirectory = path.join(process.cwd(), '_posts')

export function getAllPosts() : Post[] {
  const posts = getAllPostsRecursive(postsDirectory);
  return posts.sort((a,b) => a.date < b.date ? 1 : -1);
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
      const category = path.relative(postsDirectory, dir);

      posts.push({
        slug,
        category,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || '',
        content,
        categories: data.categories || [],
      });
    }
  })

  return posts;
}

export function getPostsByCategory(category: string) : Post[] {
  return getAllPosts().filter(post => post.category === category);
}

export async function getPostBySlug(category: string, slug: string) : Promise<Post> {
  const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || '',
    content: mdxSource,
    categories: data.categories || [],
  }
}

export function searchPosts(searchTerm: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => {
    const contentString = typeof post.content === 'string' ? post.content : JSON.stringify(post.content);
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            || contentString.toLowerCase().includes(searchTerm.toLowerCase());
  });
}