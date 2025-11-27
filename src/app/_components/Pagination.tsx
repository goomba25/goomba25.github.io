import Link from "next/link";
import styles from "@/styles/_components/pagination.module.css";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  category: string; // 🔥 category 추가
}

export default function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
  category
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getHref = (number: number) =>
    category === "all"
      ? `/archive/page/${number}`
      : `/archive/${category}/page/${number}`;

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination_list}>
        {currentPage > 1 && (
          <li>
            <Link href={getHref(currentPage - 1)} className={`${styles.pagination_link} ${styles.prev}`}>
              〈
            </Link>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number}>
            <Link href={getHref(number)}
              className={`${styles.pagination_link} ${currentPage === number ? styles.active : ""}`}>
              {number}
            </Link>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link href={getHref(currentPage + 1)} className={`${styles.pagination_link} ${styles.next}`}>
              〉
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
