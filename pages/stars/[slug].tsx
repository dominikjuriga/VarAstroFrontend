import React, { useEffect, useState } from 'react'
import StarTable from '../../components/StarTable';
import StarCatalogTable from '../../components/StarCatalogTable';
import Card from "../../components/Card";
import { useRouter } from 'next/router';
import { useApi } from '../../hooks/useApi';

const Slug = () => {
  const { slug } = useRouter().query
  const { data, loading, error } = useApi({ path: `stars/${slug}` })

  if (loading || data === null) return <p>Loading</p>

  return (
    <div>
      <h3>Object {data && data.name}</h3>
      <Card title={`Star Details`}>
        {/* <StarTable data={data} /> */}
      </Card>
      {/* <Card title={`Star Catalogs`}>
        <StarCatalogTable starCatalogs={data.starCatalogs} />
      </Card> */}
      {/* <TestBoxChart></TestBoxChart> */}
    </div>
  )
}

export default Slug