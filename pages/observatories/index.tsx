import React, { useState, useEffect } from 'react'
import { getObservatories, IObservatory } from '../api/simulate'
import ObservatoryList from '../../components/ObservatoryList'

const Observatories = () => {
  const [items, setItems] = useState<IObservatory[] | null>(null)

  const fetchData = async () => {
    const result = await getObservatories()
    if (result.status === 200) {
      setItems(result.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (items === null) {
    return (
      <div>Loading...</div>
    )
  }

  return <div>
    <h1>Your Observatories</h1>

    <ObservatoryList items={items} />
  </div>
}



export default Observatories