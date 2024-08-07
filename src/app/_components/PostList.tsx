import Link from 'next/link'
import styles from "@/styles/_components/postList.module.css"
import { Post } from '@/_lib/_interface/post'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts } : PostListProps) {
  return (
    <ul className={styles.postList}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.postItem}>
          <Link href={`/posts/${post.category}/${post.slug}`} className={styles.postTitle}>
            {post.title}
          </Link>
          <p className={styles.postDate}>{post.date}</p>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}