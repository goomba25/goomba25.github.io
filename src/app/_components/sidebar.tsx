import Link from "next/link";
import styles from "@/styles/sidebar.module.css"

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <ul className={styles.categories}>
        <li>
          <Link href="/archive/categories/category_c">C 언어</Link>
        </li>
        <li>
          <Link href="/archive/categories/category_cpp">C++ 언어</Link>
        </li>
      </ul>
    </div>
  );
}