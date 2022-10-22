import React from 'react'
import s from "../styles/Loader.module.css"

const NonPositionedLoader = () => {
  // Origin: https://cssloaders.github.io/
  return (
    <span className={s.loader}></span>
  )
}

export default NonPositionedLoader