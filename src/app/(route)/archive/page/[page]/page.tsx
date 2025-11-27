import { getAllPosts } from "@/_lib/postUtils"
import PostList from "@/app/_components/PostList"
import Pagination from "@/app/_components/Pagination"
import styles from "@/styles/_pages/archive.module.css"

export function generateStaticParams() {
  const posts = getAllPosts();
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default function ArchivePage({ params }: { params: { page: string } }) {
  const posts = getAllPosts();
  const page = Number(params.page);
  const postsPerPage = 5;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts ({posts.length})</h1>

      <PostList 
        posts={posts.slice((page - 1) * postsPerPage, page * postsPerPage)} 
        category="all"
      />

      {/* 🔥 Pagination을 직접 렌더링 (원본 구조 유지) */}
      <Pagination 
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={page}
        category="all"
      />
    </div>
  )
}
