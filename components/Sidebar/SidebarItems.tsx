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
    href: "/stars",
    icon: <BiStar />
  },
]

const unauthorizedUserMenu = [
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
]

const authorizedUserMenu = [
  {
    title: "New Light Curve",
    href: "/lightcurves/upload",
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