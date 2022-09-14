import React, { useState, useEffect } from 'react'
import DeviceList from '../../components/DeviceList'
import getDevices, { Device } from '../api/simulate'
import { toast } from "react-toastify"

const Devices = () => {
  const [devices, setDevices] = useState<Device[] | null>(null)

  const fetchData = async () => {
    const result = await getDevices()
    if (result.status === 200) {
      setDevices(result.data)
    }
  }

  const removeDevice = (id: number) => {
    // TODO contact backend
    if (devices !== null) {
      setDevices(devices => devices.filter(d => d.id !== id))
      toast.success("Device Has Been Removed.")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (devices === null) {
    return (
      <div>Loading...</div>
    )
  }

  return <div>
    <h1>Your Devices</h1>

    <DeviceList title={`Telescopes`} removeDevice={removeDevice} devices={devices.filter((d) => d.deviceType === "telescope")} />
    <DeviceList title={`Cameras`} removeDevice={removeDevice} devices={devices.filter((d) => d.deviceType === "camera")} />
  </div>
}



export default Devices