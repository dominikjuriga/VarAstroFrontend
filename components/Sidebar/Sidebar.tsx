import React from 'react'
import Link from "next/link"
import s from "../../styles/Sidebar.module.css"
import useAuthentication from '../../features/auth/hooks/useAuthentication'
import { menu, unauthorizedUserMenu, authorizedUserMenu } from "./SidebarItems";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"

interface IProps {
  sidebarToggled: boolean
}

const Sidebar = ({ sidebarToggled }: IProps) => {
  const { user, logout } = useAuthentication();

  return (
    <div className={`${s.sidebar} ${sidebarToggled ? s.sidebarToggled : ""}`}>
      <ul>
        {menu.map((item) =>
        (
          <li key={item.href}>
            <Link href={item.href}>
              <a className={s.sidebarItem}>
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
              <a className={s.sidebarItem}>
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

        {user && authorizedUserMenu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a className={s.sidebarItem}>
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
          <li>
            <span className={s.sidebarItem}>
              <span title={"User"} className={s.sidebarIcon}>
                <AiOutlineUser />
              </span>
              <span className={`${s.sidebarLabel} ${sidebarToggled ? s.sidebarLabelToggled : ""}`}>
                {user.firstName} {user.lastName}
              </span>
            </span>
          </li>
          <li>
            <span className={s.sidebarItem}>
              <span title={"User"} className={s.sidebarIcon}>
                <AiOutlineLogout />
              </span>
              <button onClick={logout} className={`${s.sidebarLabel} ${sidebarToggled ? s.sidebarLabelToggled : ""}`}>
                Log Out
              </button>
            </span>
          </li>
        </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar