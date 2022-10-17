import React, { useEffect, useState, useRef } from 'react'
import { API_URL } from '../../static/API'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { useApi } from '../../hooks/useApi'
import useAuthentication from '../../features/auth/hooks/useAuthentication'

// This is a reference that is being ported to the UploadNew (will later be removed)
const Upload = () => {
  const { data: observatoryData } = useApi({ path: "Observatories" });
  const { data: deviceData } = useApi({ path: "Devices" });
  const { user } = useAuthentication();

  const [file, setFile] = useState(null);
  const lightCurveFileRef = useRef(null);
  const handleLightCurveFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  const openFileInputDialog = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    lightCurveFileRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file === null) {
      toast.error("File cannot be empty")
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/LightCurves/file`, {
      method: "POST",
      body: formData
    })
    const data = await response.json()
  }

  useEffect(() => {
    // console.log({ file })
  }, [file])

  if (observatoryData && deviceData) {
    return <form onSubmit={handleSubmit}>
      <label htmlFor="lightCurveFile">Light Curve File</label>
      <input ref={lightCurveFileRef} hidden type="file" name="lightCurveFile" onChange={handleLightCurveFileChange} id="lightCurveFile" />
      <button onClick={openFileInputDialog}>File</button>
      <select>
        {observatoryData.map((observatory: any) => (
          <option key={observatory.id} value={observatory.id}>{observatory.name}</option>
        ))}
      </select>
      <select>
        {deviceData.map((device: any) => (
          <option key={device.id} value={device.id}>{device.name}</option>
        ))}
      </select>
      <p>{file === null ? "No File Selected" : file?.name}</p>
      <button type="submit">Submit</button>
    </form>
  }

  return <Loader />
}

export default Upload