import Link from "next/link";
import HeaderStyle from "@/styles/header.module.css"

export default function Header() {
  return (
    <header className={HeaderStyle.global}>
      <Link href="/" className={HeaderStyle.page_name}>
        Goomba
      </Link>
      <nav className={HeaderStyle.nav}>
        <ul className={HeaderStyle.list}>
          <li className={HeaderStyle.list_item}>
            <Link href="/" className={HeaderStyle.nav_link}>Profile</Link>
          </li>
          <li className={HeaderStyle.list_item}>
            <Link href="/" className={HeaderStyle.nav_link}>Archive</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}