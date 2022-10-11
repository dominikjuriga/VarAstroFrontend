import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button"
import DataTable from "../../components/DataTable"
import { GridColDef } from "@mui/x-data-grid";

const Observatories = () => {
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
  ];

  return <div>
    <h1>Your Observatories</h1>
    <DataTable endpointName="Observatories" columns={columns}>
      <Button>
        <Link href="/observatories/CreateObservatory">Create New Observatory</Link>
      </Button>
    </DataTable>
  </div>
}


export default Observatories