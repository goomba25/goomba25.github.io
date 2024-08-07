import Image from "next/image";
import styles from "@/styles/_pages/profile.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>[ 서한승 포트폴리오 ]</h1>
        <br/>
        <p>
          안녕하세요. <br/>
          개발자 서한승입니다.
        </p>
    </div>
  );
}