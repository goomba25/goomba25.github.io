import style from "@/styles/info-card.module.css"

export default function InfoBox(props: any) {
  return (
    <div className={style.global}>
      <div className={style.cardView}>
        <h1 className={style.titleText}>{props.title}</h1>
        <p className={style.infoText}>{props.info}</p>
      </div>
    </div>
  );
}
