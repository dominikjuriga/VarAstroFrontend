import React from 'react'
import { useApi } from '../../hooks/useApi'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Row from '../../components/Table/Row'

const LightCurve = () => {
  const { slug } = useRouter().query

  const { data } = useApi({ path: `LightCurves/${slug}` })
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <Row header={'Author'} value={`${data.user.firstName} ${data.user.lastName}`} />
            <Row header={'Julian Date Format'} value={data.julianDateFormat} />
            <Row header={'Photometric System'} value={data.photometricSystem} />
            <Row header={'Observatory'} value={data.observatory?.name ?? "N/A"} />
            <Row header={'Camera'} value={data.camera?.name ?? "N/A"} />
            <Row header={'Telescope'} value={data.telescope?.name ?? "N/A"} />
            <Row header={'Filter Type'} value={data.filter} />
            <Row header={'Aperture'} value={data.aperture} />
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return (
    <Loader />
  )
}

export default LightCurve