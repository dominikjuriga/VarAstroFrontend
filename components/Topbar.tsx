import React from 'react'
import Link from "next/link"
import s from "../styles/Topbar.module.css"
interface IProps {
  children: React.ReactNode,
  pageTitle: string
}

const Topbar = ({ children, pageTitle }: IProps) => {
  return (
    <div className={s.topbar}>
      {children}
      <Link href="/">
        <a href="">
          <h2>{pageTitle}</h2>
        </a>
      </Link>
    </div>
  )
}

export default Topbar