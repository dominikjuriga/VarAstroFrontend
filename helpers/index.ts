const formatCoordinate = (value: number) => value.toFixed(6)

interface IServiceResponse {
  success: boolean,
  data?: any,
  message: string
}

const isResponseSuccessful = (response: IServiceResponse) => {
  return response.success;
}


export { formatCoordinate, isResponseSuccessful }
export type { IServiceResponse }