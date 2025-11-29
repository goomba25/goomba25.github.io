import { getPostBySlug, getAllPosts } from "@/_lib/postUtils";
import { SerializedPost } from "@/_lib/_interface/post";
import styles from "@/styles/_pages/postPage.module.css"

export default async function PostPage({ 
  params 
} : {
  params: { category: string, slug: string }
}) {
  const post: SerializedPost = await getPostBySlug(params.category, params.slug);

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <time>{new Date(post.date).toLocaleDateString()}</time>
        <ul className={styles.categories}>
          {post.categories.map(category => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      <div className={styles.contents + " markdown"}>
        {post.content}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    category: post.categories[0],
    slug: post.slug,
  }));
}