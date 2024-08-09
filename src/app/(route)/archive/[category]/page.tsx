import { getPostsByCategory } from "@/_lib/postUtils";
import { CategoryLists } from "@/_lib/categoryLists";
import PostList from "@/app/_components/PostList"
import Pagination from "@/app/_components/Pagination"
import styles from "@/styles/_pages/archive.module.css"

export default async function CategoryPage({params}: {params: {category: string}}) {
  const posts = await getPostsByCategory(params.category);
  const currentPage = 1;
  const postsPerPage = 5;

  const categoryItem:any = CategoryLists.flatMap(section => section.items).find(item => item.slug === params.category);
  const displayName:string = categoryItem ? categoryItem.displayName : params.category;

  if (posts.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>'{displayName}' List</h1>
        <p className={styles.noPostsMessage}>No Post.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>'{displayName}' List</h1>
      <PostList posts={posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)} />
      <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} currentPage={currentPage} />
    </div>
  );
}

export async function generateStaticParams() {
  return CategoryLists.flatMap(section =>
    section.items.map(item => ({
      category: item.slug,
    }))
  );
}