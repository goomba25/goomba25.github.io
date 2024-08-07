import Sidebar from "@/app/_components/Sidebar"
import styles from "@/styles/_layouts/sublayout.module.css"

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
