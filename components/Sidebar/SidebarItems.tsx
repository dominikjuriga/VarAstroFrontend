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

export { menu, unauthorizedUserMenu }