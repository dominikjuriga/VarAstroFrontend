import React, { useEffect, useState } from 'react'
import StarTable from '../../components/StarTable';
import StarCatalogTable from '../../components/StarCatalogTable';
import Card from "../../components/Card";
import { IStar } from '../../models';
import { useRouter } from 'next/router';
import TestBoxChart from "../../components/TestBoxChart"

const Slug = () => {
  const [data, setData] = useState<IStar | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const { slug } = useRouter().query

  const fetchStarData = async (slug: string): Promise<void> => {
    const response = await fetch(`https://var-dj.astro.cz/api/star/${slug}`);
    if (response.status == 200) {
      const result = await await response.json()
      setData(result.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchStarData(slug.toString())
    }
  }, [slug])

  if (loading || data === null) return <p>Loading</p>

  return (
    <div>
      <h3>Object {data && data.name}</h3>
      <Card title={`Star Details`}>
        <StarTable data={data} />
      </Card>
      <Card title={`Star Catalogs`}>
        <StarCatalogTable starCatalogs={data.starCatalogs} />
      </Card>
      {/* <TestBoxChart></TestBoxChart> */}
    </div>
  )
}

export default Slug