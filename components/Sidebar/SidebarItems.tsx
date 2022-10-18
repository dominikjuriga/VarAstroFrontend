import React from "react";
import { FaHome } from "react-icons/fa"
import { BiLogIn, BiUserPlus, BiStar, BiPlus, BiDevices, BiCamera, BiBuildingHouse } from "react-icons/bi"

const menu = [
  {
    title: "Home",
    href: "/",
    icon: <FaHome />
  },
  {
    title: "Stars",
    href: "/Stars",
    icon: <BiStar />
  },
]

const unauthorizedUserMenu = [
  {
    title: "Log In",
    href: "/Auth/Login",
    icon: <BiLogIn />
  },
  {
    title: "Register",
    href: "/Auth/Register",
    icon: <BiUserPlus />
  },
]

const authorizedUserMenu = [
  {
    title: "Light Curves",
    href: "/LightCurves",
    icon: <BiPlus />
  },
  {
    title: "Devices",
    href: "/Devices",
    icon: <BiDevices />
  },
  {
    title: "Observatories",
    href: "/Observatories",
    icon: <BiDevices />
  }
]

export { menu, unauthorizedUserMenu, authorizedUserMenu }