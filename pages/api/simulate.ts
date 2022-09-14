export interface Device {
  id: number,
  title: string,
  deviceType: string
}

export interface IResponse {
  data: Device[],
  status: number
}

const delay = async (delay: number = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  return
}

const getDevices = async (): IResponse => {
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

export default getDevices;