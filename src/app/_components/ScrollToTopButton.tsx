'use client'

import { useState } from 'react'
import styles from "@/styles/_components/scrollbutton.module.css"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button onClick={scrollToTop} className={styles.scrollToTop}>
      ↑
    </button>
  )
}