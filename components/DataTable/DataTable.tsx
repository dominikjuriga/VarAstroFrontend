import React, { useState, useCallback } from 'react'
import { toast } from "react-toastify"
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid'
import Stack from '@mui/system/Stack';
import Button from "@mui/material/Button"
import Loader from '../Loader';
import { useApi } from "../../hooks/useApi"
import useAuthentication from "../../features/auth/hooks/useAuthentication"
import useProcessChanges from "./useProcessChanges";
import { API_URL } from "../../static/API";
import { HTTP } from "../../static/HTTP";
import { handleEntered, handleNo, handleYes } from "./ActionHandlers";
import ConfirmDialog from './ConfirmDialog';

interface IDataTableProps {
  columns: any[];
  endpointName: string;
  children?: React.ReactNode;
}

const DataTable = ({ columns, endpointName, children }: IDataTableProps) => {
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
  const { data, refetch, error, setData } = useApi({ path: endpointName, requiresAuth: true });
  const { processRowUpdate, processRowDelete } = useProcessChanges();
  const { jwt } = useAuthentication();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    toast.error(error.message)
  }, []);

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
        "Authorization": `Bearer ${jwt}`
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

  if (error) {
    <h1>Error</h1>
  }

  else if (data) {
    return (
      <Stack spacing={1}>
        <Stack direction={{ xs: "column", md: "row" }}>
          <Button disabled={selected.length === 0} onClick={() => processRowDelete(setPromiseArguments)}>Delete Selected</Button>
          <Button disabled={selected.length !== 1} onClick={() => setDefault()}>Select as default</Button>
          {children}
        </Stack>

        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <ConfirmDialog promiseArguments={promiseArguments}
              itemCount={selected.length}
              noButtonRef={noButtonRef}
              handleEntered={handleEntered}
              handleNo={() => handleNo(promiseArguments, setPromiseArguments)}
              handleYes={() => handleYes(endpointName, selected, refetch, promiseArguments, setPromiseArguments, jwt)} />
            <DataGrid autoHeight rows={data} columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow, endpointName, setSelected, jwt)}
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