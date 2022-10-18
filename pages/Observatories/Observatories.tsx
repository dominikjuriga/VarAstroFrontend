import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button"
import DataTable from "../../components/EditableDataTable"
import { GridColDef } from "@mui/x-data-grid";
import DefaultContainer from "../../components/DefaultContainer";
import { Typography } from "@mui/material";

const Observatories = () => {
  function getBooleanText(params: any) {
    return params.row.isDefault ? "Yes" : "No";
  }
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      editable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'isDefault',
      headerName: 'Is Default',
      minWidth: 200,
      flex: 1,
      valueGetter: getBooleanText
    },
  ];

  return <div>
    <DefaultContainer>
      <Typography variant='h2'>Your Observatories</Typography>
      <DataTable endpointName="Observatories" columns={columns}>
        <Button>
          <Link href="/Observatories/CreateObservatory">Create New Observatory</Link>
        </Button>
      </DataTable>
    </DefaultContainer>
  </div>
}


export default Observatories