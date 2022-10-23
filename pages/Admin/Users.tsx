import React from 'react'
import { useApi } from '../../hooks/useApi'
import DataTable from '../../components/DataTable'
import Loader from '../../components/Loader'
import { GridColDef } from '@mui/x-data-grid'
const Users = () => {
  const { data: rows } = useApi({ path: "Admin/Users", requiresAuth: true })
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First Name',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'roles',
      headerName: 'Roles',
      valueGetter: (params) => {
        return params.row.roles.join(", ")
      },
      minWidth: 200,
      flex: 1
    },
  ];
  const dataTableProps = { rows, columns }
  if (rows) {
    return (
      <DataTable {...dataTableProps} />
    )
  }

  return <Loader />
}

export default Users