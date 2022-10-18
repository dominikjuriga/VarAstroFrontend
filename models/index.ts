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

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IDecodedToken {
  firstName: string,
  lastName: string,
  defaultObservatoryId?: number;
  defaultCameraDeviceId?: number;
  defaultTelescopeDeviceId?: number;
}

export interface AuthContextType {
  user?: IUser;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  register: (values: IRegisterValues) => void;
  updateUser: (values: Partial<IRegisterValues>) => void;
  jwt?: string;
  logout: () => void;
  refetchSessionData: () => void;
  loginFromCookie: () => void;
}

export interface IRegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}