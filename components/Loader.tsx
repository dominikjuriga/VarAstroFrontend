import React from 'react'
import s from "../styles/Loader.module.css"

const Loader = () => {
  // Origin: https://cssloaders.github.io/
  return (
    <span className={`${s.loader} ${s.positioned}`}></span>
  )
}

export default Loader