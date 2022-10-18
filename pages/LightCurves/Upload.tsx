import { Typography } from '@mui/material';
import React, { useState } from 'react'
import StepOne from './Upload/StepOne'
import StepTwo from './Upload/StepTwo'

const Upload = () => {
  const [star, setStar] = useState();

  return (
    <>
      <Typography variant="h2">Upload A New Light Curve</Typography>
      {star === undefined && (
        <StepOne setStar={setStar}></StepOne>
      )}
      {star !== undefined && (
        <StepTwo></StepTwo>
      )}
    </>
  )
}

export default Upload