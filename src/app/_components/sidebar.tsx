import Link from 'next/link'
import { CategoryLists } from '@/_lib/categoryLists'
import styles from "@/styles/sidebar.module.css"

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {CategoryLists.map((section) => (
        <div key={section.title} className={styles.sidebarSection}>
          <h3 className={styles.sidebarTitle}>{section.title}</h3>
          <ul className={styles.sidebarList}>
            {section.items.map((item) => (
              <li key={item.slug} className={styles.sidebarItem}>
                <Link href={`/archive/${item.slug}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}