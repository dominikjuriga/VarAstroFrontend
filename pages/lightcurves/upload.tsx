import React, { useEffect, useState, useRef } from 'react'
import { API_URL } from '../../static/API'
import UploadStepOne from '../../components/LightCurves/UploadStepOne'
import UploadStepTwo from '../../components/LightCurves/UploadStepTwo'
import { toast } from 'react-toastify'

const Upload = () => {
  // const [step, setStep] = useState(1)
  // const maxStep = 2;
  // const nextStep = () => {
  //   if (step >= maxStep) return;
  //   setStep(s => s + 1)
  // }
  // const previousStep = () => {
  //   if (step <= 1) return;
  //   setStep(s => s - 1)
  // }

  // if (step == 1) return <UploadStepOne nextStep={nextStep} />
  // if (step == 2) return <UploadStepTwo previousStep={previousStep} />

  // return <p>An error has occured</p>

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

  return <form onSubmit={handleSubmit}>
    <label htmlFor="lightCurveFile">Light Curve File</label>
    <input ref={lightCurveFileRef} hidden type="file" name="lightCurveFile" onChange={handleLightCurveFileChange} id="lightCurveFile" />
    <button onClick={openFileInputDialog}>File</button>
    <p>{file === null ? "No File Selected" : file?.name}</p>
    <button type="submit">Submit</button>
  </form>
}

export default Upload