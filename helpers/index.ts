const formatCoordinate = (value: number) => value.toFixed(6)

interface IServiceResponse {
  success: boolean,
  data?: any,
  message: string
}

const isResponseSuccessul = (response: IServiceResponse) => {
  return response.success;
}


export { formatCoordinate, isResponseSuccessul, IServiceResponse }