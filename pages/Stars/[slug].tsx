import React from 'react'
import { useRouter } from 'next/router';
import { GridColDef } from '@mui/x-data-grid';
import Loader from '../../components/Loader';
import DataTable from '../../components/DataTable';
import { useApi } from '../../hooks/useApi';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const Slug = () => {
  const { slug } = useRouter().query
  const { data, loading, error } = useApi({ path: `stars/${slug}` })
  const columns: GridColDef[] = [
    {
      field: 'catalogName',
      headerName: 'Catalog',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'crossID',
      headerName: 'Cross ID',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'rightAscension',
      headerName: 'Right Ascension',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'declination',
      headerName: 'Declination',
      minWidth: 200,
      flex: 1
    },
  ];

  if (data) {
    return (
      <div>
        <Typography variant='h2'>Star <b>{data.name}</b></Typography>
        <Typography variant='h3'>Star Catalos & Cross Identification</Typography>
        <DataTable columns={columns} rows={data.starCatalogs} ></DataTable>
        <Divider />
      </div>
    )
  }
  return <Loader />
}

export default Slug