import React from 'react'
import Link from "next/link"
import s from "../../styles/Sidebar.module.css"
import useAuth from '../../features/auth/hooks/useAuth'
import { menu, unauthorizedUserMenu } from "./SidebarItems";

interface IProps {
  sidebarToggled: boolean
}

const Sidebar = ({ sidebarToggled }: IProps) => {
  const { user, logout } = useAuth();

  return (
    <div className={`${s.sidebar} ${sidebarToggled ? s.sidebarToggled : ""}`}>
      <ul>
        {menu.map((item) =>
        (
          <li key={item.href}>
            <Link href={item.href}>
              <a>
                <span title={item.title} className={s.sidebarIcon}>
                  {item.icon}
                </span>
                <span className={`${s.sidebarLabel} ${sidebarToggled ? s.sidebarLabelToggled : ""}`}>
                  {item.title}
                </span>
              </a>
            </Link>
          </li>
        )
        )}

        {!user && unauthorizedUserMenu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a>
                <span title={item.title} className={s.sidebarIcon}>
                  {item.icon}
                </span>
                <span className={`${s.sidebarLabel} ${sidebarToggled ? s.sidebarLabelToggled : ""}`}>
                  {item.title}
                </span>
              </a>
            </Link>
          </li>
        ))}

        {user && (<>
          <li>{user.FirstName} {user.LastName}</li>
          <li><button onClick={logout}>Log Out</button></li>
        </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar