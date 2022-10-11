import React from 'react'
import { IObservatory } from "../models"

interface IProps {
  items: IObservatory[];
}

const ObservatoryList: React.FC<IProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

export default ObservatoryList