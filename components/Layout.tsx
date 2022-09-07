import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import s from "../styles/Layout.module.css"

interface IProps {
  children: React.ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(true)
  const seo = {
    pageTitle: "Var Astro"
  }
  const toggleSidebar = () => {
    setSidebarToggled(t => !t)
  }
  return (
    <div className={s.layout}>
      <Sidebar sidebarToggled={sidebarToggled} />
      <div className={s.layoutContent}>
        <Topbar pageTitle={seo.pageTitle}>
          <Hamburger sidebarToggled={sidebarToggled} toggleSidebar={toggleSidebar} />
        </Topbar>
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout