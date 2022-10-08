export interface IDevice {
  id: number,
  title: string,
  deviceType: string
}

export interface IObservatory {
  id: number,
  details: string,
}

export interface IDeviceResponse {
  data: IDevice[],
  status: number
}

export interface IObservatoryResponse {
  data: IObservatory[]
}

const delay = async (delay: number = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  return
}

const getDevices = async (): IDeviceResponse => {
  // Simulate API request to retrieve device list
  await delay()
  return {
    status: 200,
    data: [
      {
        id: 1,
        title: "NWT 300/1410",
        deviceType: "telescope"
      },
      {
        id: 2,
        title: "MI G4-16000",
        deviceType: "camera"
      }
    ]
  }
}
const getObservatories = async (): IObservatoryResponse => {
  // Simulate API request to retrieve device list
  await delay()
  return {
    status: 200,
    data: [
      {
        id: 1,
        details: "Brno Kravi Hora"
      },
    ]
  }
}

export { getDevices, getObservatories };