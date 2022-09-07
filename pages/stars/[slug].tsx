import React, { useEffect, useState } from 'react'
import StarTable from '../../components/StarTable';
import Card from "../../components/Card";

interface IResponse {
  name: string,
  ra: number,
  dec: number,
  starPublish: {
    discoverer: string
  }
}

const Slug = () => {
  const [data, setData] = useState<IResponse | null>(null);
  const [loading, setLoading] = useState(true)
  const id = 1
  const fetchStarData = async () => {
    const response = await fetch(`https://var-dj.astro.cz/api/star/${id}`);
    if (response.status == 200) {
      const result = await await response.json()
      setData(result.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStarData()
  }, [])

  if (loading) return <p>Loading</p>

  return (
    <div>
      <h3>Object {data && data.name}</h3>
      <Card>
        <StarTable data={data} />
      </Card>
    </div>
  )
}

export default Slug