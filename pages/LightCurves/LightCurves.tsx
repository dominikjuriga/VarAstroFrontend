import React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useApi } from '../../hooks/useApi'
import Loader from '../../components/Loader'

const LightCurves = () => {
  const { data } = useApi({ path: "LightCurves" })
  if (data) {

    return (
      <div>
        <Button variant='contained'>
          <Link href={"/LightCurves/Upload"}>Upload</Link>
        </Button>

        <ul>
          {data.map((lc) => (
            <li key={lc.id}>
              <Link href={`/LightCurves/${lc.id}`}>
                <a>
                  {lc.user.firstName} {lc.user.lastName}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return <Loader />
}

export default LightCurves