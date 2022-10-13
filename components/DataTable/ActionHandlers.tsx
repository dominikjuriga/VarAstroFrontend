import React from "react";
import { toast } from "react-toastify"
import { API_URL } from "../../static/API";
import { HTTP } from "../../static/HTTP";
import { IServiceResponse } from "../../models"
import { GridSelectionModel } from "@mui/x-data-grid";

export const handleEntered = () => {
  // The `autoFocus` is not used because, if used, the same Enter that saves
  // the cell triggers "No". Instead, we manually focus the "No" button once
  // the dialog is fully open.
  // noButtonRef.current?.focus();
};

export const handleNo = (
  promiseArguments: any,
  setPromiseArguments: React.Dispatch<React.SetStateAction<any>>
): void => {
  const { oldRow, resolve } = promiseArguments;
  resolve(oldRow);
  setPromiseArguments(null);
};

export const handleYes = async (
  endpointName: string,
  selected: GridSelectionModel,
  refetch: () => void,
  promiseArguments: any,
  setPromiseArguments: React.Dispatch<React.SetStateAction<any>>,
  jwt?: string,
) => {
  const { reject, resolve } = promiseArguments;

  // Make the HTTP request to save in the backend
  const response = await fetch(`${API_URL}/${endpointName}`, {
    method: HTTP.DELETE,
    body: JSON.stringify(selected),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })

  const serviceResponse: IServiceResponse = await response.json();
  if (serviceResponse.success) {
    toast(`Removed ${serviceResponse.data} item(s).`)
    refetch();
    resolve();
  } else {
    reject();
  }

  setPromiseArguments(null);
};