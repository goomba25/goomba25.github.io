import Link from "next/link";
import SidebarStyle from "@/styles/sidebar.module.css";

export default function Sidebar() {
  return (
    <main className={SidebarStyle.global}>
      <h1 className={SidebarStyle.class}>C 계열</h1>
      <a className={SidebarStyle.classItem}>C/C++</a>
      <a className={SidebarStyle.classItem}>STL</a>
      <h1 className={SidebarStyle.class}>Cross platform</h1>
      <a className={SidebarStyle.classItem}>Dart</a>
      <a className={SidebarStyle.classItem}>Flutter</a>
      <a className={SidebarStyle.classItem}>Qt with C++</a>
      <a className={SidebarStyle.classItem}>QML</a>
      <h1 className={SidebarStyle.class}>Android</h1>
      <a className={SidebarStyle.classItem}>JAVA</a>
      <a className={SidebarStyle.classItem}>Kotlin</a>
      <a className={SidebarStyle.classItem}>XML</a>
      <h1 className={SidebarStyle.class}>Web</h1>
      <a className={SidebarStyle.classItem}>HTML</a>
      <a className={SidebarStyle.classItem}>CSS</a>
      <a className={SidebarStyle.classItem}>Blog</a>
      <h1 className={SidebarStyle.class}>Tools</h1>
      <a className={SidebarStyle.classItem}>Docker</a>
      <h1 className={SidebarStyle.class}>Etc.</h1>
      <a className={SidebarStyle.classItem}>Git</a>
      <a className={SidebarStyle.classItem}>Linux</a>
    </main>
  );
}
