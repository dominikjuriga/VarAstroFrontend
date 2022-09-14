import React, { useState } from 'react'
import UploadStepOne from '../../components/LightCurves/UploadStepOne'
import UploadStepTwo from '../../components/LightCurves/UploadStepTwo'

const Upload = () => {
  const [step, setStep] = useState(1)
  const maxStep = 2;
  const nextStep = () => {
    if (step >= maxStep) return;
    setStep(s => s + 1)
  }
  const previousStep = () => {
    if (step <= 1) return;
    setStep(s => s - 1)
  }

  if (step == 1) return <UploadStepOne nextStep={nextStep} />
  if (step == 2) return <UploadStepTwo previousStep={previousStep} />

  return <p>An error has occured</p>
}

export default Upload