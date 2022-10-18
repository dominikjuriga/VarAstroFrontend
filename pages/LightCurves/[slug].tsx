import React from 'react'
import { useApi } from '../../hooks/useApi'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'

const LightCurve = () => {
  const { slug } = useRouter().query

  const { data } = useApi({ path: `LightCurves/${slug}` })
  if (data) {
    return (
      <ul>
        <li>{data.user.firstName}</li>
      </ul>
    )
  }
  return (
    <Loader />
  )
}

export default LightCurve