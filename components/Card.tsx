import React from 'react'
import s from "../styles/Card.module.css"

interface IProps {
  children: React.ReactNode,
  title: string
}

const Card: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className={s.card}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default Card