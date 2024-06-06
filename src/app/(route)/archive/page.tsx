import { GetStaticProps } from "next";
import MainStyle from "@/styles/archive.module.css";
import SideLayout from "@/_components/layout/sidebar";

export default function Archive() {
  return (
    <div className={MainStyle.global}>
      <SideLayout />
      <h1>Archive</h1>
    </div>
  );
}