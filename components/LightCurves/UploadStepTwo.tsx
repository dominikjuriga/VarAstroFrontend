import React from 'react'

interface IProps {
  previousStep: () => void
}

const UploadStepTwo: React.FC<IProps> = ({ previousStep }) => {
  return (
    <>
      <button onClick={previousStep}>Previous step</button>
    </>
  )
}

export default UploadStepTwo