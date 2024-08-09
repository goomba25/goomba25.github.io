import Link from 'next/link'
import styles from "@/styles/_components/postList.module.css"
import { PostListProps } from '@/_lib/_interface/post'

export default function PostList({ posts, category } : PostListProps) {
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.categories.includes(category));

  return (
    <ul className={styles.postList}>
      {filteredPosts.map((post) => (
        <li key={post.slug} className={styles.postItem}>
          <Link 
            href={category === 'all'
              ? `/archive/${post.categories[0]}/${post.slug}`
              : `/archive/${category}/${post.slug}`}
            className={styles.postTitle}>
            {post.title}
          </Link>
          <p className={styles.postDate}>{new Date(post.date).toLocaleDateString()}</p>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
          <ul className={styles.categories}>
            {post.categories.map(cat => (
              <li key={cat} className={styles.category}>
                {cat}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}