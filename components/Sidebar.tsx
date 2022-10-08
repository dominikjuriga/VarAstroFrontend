import React from 'react'
import Link from "next/link"
import s from "../styles/Sidebar.module.css"
import { FaHome } from "react-icons/fa"
import { BiLogIn, BiUserPlus, BiStar, BiPlus, BiDevices, BiCamera, BiBuildingHouse } from "react-icons/bi"

interface IProps {
  sidebarToggled: boolean
}

const Sidebar = ({ sidebarToggled }: IProps) => {
  const menu = [
    {
      title: "Home",
      href: "/",
      icon: <FaHome />
    },
    {
      title: "Log In",
      href: "/auth/login",
      icon: <BiLogIn />
    },
    {
      title: "Register",
      href: "/auth/register",
      icon: <BiUserPlus />
    },
    {
      title: "Stars",
      href: "/stars",
      icon: <BiStar />
    },
    {
      title: "New Light Curve",
      href: "/lightcurves/upload",
      icon: <BiPlus />
    },
    {
      title: "Devices",
      href: "/devices",
      icon: <BiDevices />
    },
    {
      title: "Observatories",
      href: "/observatories",
      icon: <BiDevices />
    },
    {
      title: "Create Device",
      href: "/devices/create",
      icon: <BiCamera />
    },
    {
      title: "Create Observatory",
      href: "/observatories/create",
      icon: <BiBuildingHouse />
    },
  ]
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
      </ul>
    </div>
  )
}

export default Sidebar