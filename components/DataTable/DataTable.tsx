import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'

interface IDataTable {
  columns: GridColDef[],
  rows: any[]
}

const DataTable = ({ columns, rows }: IDataTable) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      autoHeight
      checkboxSelection={false}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
    />
  )
}

export default DataTable