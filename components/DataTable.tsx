import React, { useCallback, useState } from 'react'
import { DataGrid, GridRowId, GridRowModel, GridSelectionModel } from '@mui/x-data-grid'
import { toast } from "react-toastify"
import Stack from '@mui/system/Stack';
import Button from "@mui/material/Button"
import { IObservatory } from "../models";
import { API_URL } from "../static/API";
import { HTTP } from "../static/HTTP";
import useAuthentication from "../features/auth/hooks/useAuthentication"
import { IServiceResponse } from "../models"
import { useApi } from "../hooks/useApi"
import Loader from './Loader';

interface IDataTableProps {
  columns: any[];
  endpointName: string;
  children?: React.ReactNode;
}

const DataTable = ({ columns, endpointName, children }: IDataTableProps) => {
  const { data, loading, error, setData } = useApi({ path: endpointName, requiresAuth: true });
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const { user } = useAuthentication();

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    toast.error(error.message)
  }, []);

  const deleteSelected = async (ids: GridRowId[]) => {
    const response = await fetch(`${API_URL}/${endpointName}`, {
      method: HTTP.DELETE,
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.AuthToken}`
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (serviceResponse.success) {
      setData(data.filter((item: IObservatory) => !ids.includes(item.id)))
      toast(`Removed ${serviceResponse.data} item(s).`)
    }
  }

  const processRowUpdate = React.useCallback(
    async (newRow: GridRowModel) => {
      let object = newRow;
      delete object.user;
      const response = await fetch(`${API_URL}/${endpointName}`, {
        method: HTTP.PUT,
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.AuthToken}`
        }
      });
      const serviceResponse = await response.json()
      toast("Changes Saved")
      return serviceResponse.data;
    }, [],);


  if (error) {
    <h1>Error</h1>
  }

  else if (data) {
    return (
      <Stack spacing={1}>
        <Stack direction={{ xs: "column", md: "row" }}>
          <Button disabled={selected.length === 0} onClick={() => deleteSelected(selected)}>Delete Selected</Button>
          {children}
        </Stack>

        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid autoHeight rows={data} columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              onSelectionModelChange={(newSelectionModel) => {
                setSelected(newSelectionModel);
              }}
              selectionModel={selected}
              checkboxSelection
            />
          </div>
        </div>
      </Stack >
    )
  }

  return <Loader />
}

export default DataTable