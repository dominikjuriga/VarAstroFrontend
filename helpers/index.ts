import { IServiceResponse } from "../models";

const formatCoordinate = (value: number) => value.toFixed(6)


const isResponseSuccessful = (response: IServiceResponse) => {
  return response.success;
}


export { formatCoordinate, isResponseSuccessful }