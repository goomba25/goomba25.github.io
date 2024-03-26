import FooterStyle from "@/styles/footer.module.css"

export default function Footer() {
  return (
    <footer className={FooterStyle.global}>
      <p className={FooterStyle.copyright}>
        &copy; <span></span> Goomba's github blog. All Rights Reserved.
      </p>
    </footer>
  );
}