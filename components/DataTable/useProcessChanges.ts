import React, { useCallback } from "react";
import { GridRowModel, GridSelectionModel } from "@mui/x-data-grid";
import { API_URL } from "../../static/API";
import { HTTP } from "../../static/HTTP";
import { toast } from "react-toastify";

const objectsAreDifferent = (a: object, b: object) => {
  const aJson = JSON.stringify(a)
  const bJson = JSON.stringify(b)
  return aJson !== bJson
}

const useProcessChanges = () => {
  const processRowDelete = useCallback(
    (setPromiseArguments: any) =>
      new Promise((resolve, reject) => {
        const mutation = "Do you want to proceed?";
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject });
        }
      }),
    [],
  );

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel, endpointName: string, user: any, setSelected: React.Dispatch<React.SetStateAction<GridSelectionModel>>) => {
      if (!objectsAreDifferent(newRow, oldRow)) {
        return oldRow;
      }
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
      if (serviceResponse.success) {
        toast("Changes Saved")
        setSelected([]);
        return serviceResponse.data;
      }
    }, [],);

  return { processRowDelete, processRowUpdate }
}

export default useProcessChanges;