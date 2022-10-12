import React, { useCallback, useEffect, useState } from 'react'
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
  const { data, refetch, error, setData } = useApi({ path: endpointName, requiresAuth: true });
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const { user } = useAuthentication();

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    toast.error(error.message)
  }, []);

  const deleteSelected = async () => {
    const response = await fetch(`${API_URL}/${endpointName}`, {
      method: HTTP.DELETE,
      body: JSON.stringify(selected),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.AuthToken}`
      }
    })

    const serviceResponse: IServiceResponse = await response.json();
    if (serviceResponse.success) {
      setData(data.filter((item: IObservatory) => !selected.includes(item.id)))
      toast(`Removed ${serviceResponse.data} item(s).`)
    }
  }

  const setDefault = async () => {
    if (selected.length !== 1) {
      toast.error("You can only select one observatory as default.")
      return;
    }
    const response = await fetch(`${API_URL}/${endpointName}/default`, {
      method: HTTP.POST,
      body: JSON.stringify(selected[0]),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.AuthToken}`
      }
    })
    if (response?.ok) {
      const serviceResponse = await response.json();

      if (serviceResponse.success) {
        toast(serviceResponse.message)
        setSelected([]);
        refetch();
      } else {
        toast.error(serviceResponse.message)
      }
    } else {
      toast.error(`An error has occurred (${response.status}).`)
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
          <Button disabled={selected.length === 0} onClick={() => deleteSelected()}>Delete Selected</Button>
          <Button disabled={selected.length !== 1} onClick={() => setDefault()}>Select as default</Button>
          {children}
        </Stack>

        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid autoHeight rows={data} columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={processRowUpdate}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 15]}
              pagination
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