import React from 'react'
import { Device } from '../pages/api/simulate'
import s from "../styles/DeviceList.module.css"

interface IProps {
  devices: Device[],
  removeDevice: (id: number) => void
}

const DeviceTable: React.FC<IProps> = ({ devices, removeDevice }) => {
  return (
    <table className={s.deviceTable}>
      <thead>
        <th>Name</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.title}</td>
            <td><button onClick={() => removeDevice(device.id)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DeviceTable