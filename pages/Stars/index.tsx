import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { IStar } from '../../models'
import { useApi } from '../../hooks/useApi'
import Loader from '../../components/Loader'

const Stars = () => {
  const { data, loading, error } = useApi({ path: "stars" })

  if (loading)
    return <Loader />

  return (
    <div>
      {data && data.map((star: IStar) => (
        <Link key={star.id} href={`/Stars/${star.id.toString()}`}>{star.name}</Link>
      ))}
    </div>
  )
}

export default Stars