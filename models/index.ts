export interface IStarPublish {
  id: number,
  starId: number,
  starName?: string,
  year: number,
  discoverer: string,
  publicationLink: string
}

export interface IStarVariability {
  id: number,
  starId: number,
  variabilityType: number,
  epoch: number,
  period: number,
  primaryMinimum: number
}

export interface IStarCatalogs {
  starId: number,
  catalogId: string,
  ra: number,
  dec: number,
  mag: number,
  crossId: string,
  primary: boolean,
  new: boolean
}

export interface IStar {
  id: number,
  name: string,
  ra: number,
  dec: number,
  starPublish: IStarPublish,
  starCatalogs: IStarCatalogs[]
}

export interface IServiceResponse {
  success: boolean,
  data?: any,
  message: string
}


export interface IObservatory {
  id: number;
  name: string;
  address?: string;
}

export interface IDevice {
  id: number;
  title: string;
  deviceType: string;
}

export interface IDeviceResponse {
  data: IDevice[],
  status: number,
}

export interface IObservatoryResponse {
  data: IObservatory[];
}
