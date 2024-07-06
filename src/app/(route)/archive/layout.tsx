import styles from "@/styles/archive.module.css"
import Sidebar from "@/app/_components/sidebar"

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
