import { getAllPosts } from "@/_lib/postUtils"
import PostList from "@/app/_components/PostList"
import Pagination from "@/app/_components/Pagination"
import styles from "@/styles/_pages/archive.module.css"

export default function Archive() {
  const posts = getAllPosts();
  const currentPage = 1;
  const postsPerPage = 5;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
      <PostList posts={posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)} />
      <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} currentPage={currentPage} />
    </div>
  )
}
