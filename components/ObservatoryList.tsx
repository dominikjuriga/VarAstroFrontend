import React from 'react'
import { IObservatory } from '../pages/api/simulate'

interface IProps {
  items: IObservatory[]
}

const ObservatoryList: React.FC<IProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.details}</li>
      ))}
    </ul>
  )
}

export default ObservatoryList