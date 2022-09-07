import React from 'react'
import s from "../styles/Hamburger.module.css"

interface IProps {
  toggleSidebar: () => void
  sidebarToggled: boolean
}

const Hamburger = ({ toggleSidebar, sidebarToggled }: IProps) => {
  return (
    <button className={`${s.hamburger} ${sidebarToggled ? s.sidebarToggled : ""}`} onClick={toggleSidebar}>
      <div className={`${s.line} ${s.line1}`}></div>
      <div className={`${s.line} ${s.line2}`}></div>
      <div className={`${s.line} ${s.line3}`}></div>
    </button>
  )
}

export default Hamburger