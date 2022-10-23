import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'

interface IDataTable {
  columns: GridColDef[],
  rows: any[]
}

const DataTable = ({ columns, rows }: IDataTable) => {
  const [pageSize, setPageSize] = React.useState<number>(5);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      checkboxSelection={false}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 15]}
      disableSelectionOnClick
    />
  )
}

export default DataTable