import Image from "next/image";
import style from "@/styles/profile.module.css"
import InfoCard from "@/_components/item/info-card"

export default function Home() {
  return (
    <div className={style.global}>
      <div className={style.innerBlock}>
        <h1 className={`${style.headingMain} ${style.textCenter}`}>[ 서한승 포트폴리오 ]</h1>
        <br/>
        <p className={`${style.heading2} ${style.textCenter}`}>
          안녕하세요 <br/>
          개발자 서한승입니다
        </p>
      </div>

      <div className={style.innerBlock}>
        <h1 className={`${style.heading1} ${style.textCenter}`}>[ ABOUT ME ]</h1>
        <ul className={style.infoList}>
        <InfoCard title="이름" info="서한승"></InfoCard>
        <InfoCard title="생년월일" info="94.02.05"></InfoCard>
        <InfoCard title="주소지" info="서울특별시 은평구"></InfoCard>
        </ul>
      </div>
    </div>
  );
}
