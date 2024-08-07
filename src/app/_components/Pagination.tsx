import Link from "next/link";
import styles from "@/styles/_components/pagination.module.css"

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
}

export default function Pagination({totalPosts, postsPerPage, currentPage}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination_list}>
        {currentPage > 1 && (
          <li>
            <Link href={`?page=${currentPage - 1}`} className={`${styles.pagination_link} ${styles.prev}`}> 〈 </Link>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <Link href={`?page=${number}`} className={`${styles.pagination_link} ${currentPage === number ? styles.active : ''}`}>{number}</Link>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Link href={`?page=${currentPage + 1}`} className={`${styles.pagination_link} ${styles.next}`}> 〉 </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}