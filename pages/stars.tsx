import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { IStar } from '../models'

const Stars = () => {
  const [data, setData] = useState<IStar[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const fetchData = async () => {
    const response = await fetch("https://var-dj.astro.cz/api/star")
    if (response.status === 200) {
      const result = await response.json()
      setData(result.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return <p>Loading</p>

  return (
    <div>
      {data && data.map((star) => (
        <Link key={star.id} href={`/stars/${star.id.toString()}`}>{star.name}</Link>
      ))}
    </div>
  )
}

export default Stars