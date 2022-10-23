import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React from 'react'

interface IRow {
  key?: string | number;
  header: string;
  value: string;
}

const Row = ({ key, header, value }: IRow) => {
  return (
    <TableRow
      key={key}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {header}
      </TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}

export default Row