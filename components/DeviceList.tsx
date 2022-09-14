import React from 'react'
import { Device } from '../pages/api/simulate'
import Card from "./Card"
import DeviceTable from './DeviceTable'


interface IProps {
  title: string,
  devices: Device[]
  removeDevice: (id: number) => void
}

const DeviceList: React.FC<IProps> = ({ title, devices, removeDevice }) => {

  return (
    <Card title={title}>
      {devices.length === 0 ? <p>No Devices Found</p> : <DeviceTable removeDevice={removeDevice} devices={devices} />}
    </Card>
  )
}

export default DeviceList