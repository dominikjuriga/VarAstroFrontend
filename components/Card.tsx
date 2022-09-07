import React from 'react'
import s from "../styles/Card.module.css"

interface IProps {
  children: React.ReactNode
}

const Card: React.FC<IProps> = ({ children }) => {
  return (
    <div className={s.card}>{children}</div>
  )
}

export default Card