import Button from '@mui/material/Button'
import React from 'react'
import NonPositionedLoader from '../NonPositionedLoader'

interface ISubmitButton {
  isSubmitting: boolean;
  buttonText?: string;
}

const SubmitButton = ({ isSubmitting, buttonText = "Submit" }: ISubmitButton) => {
  if (isSubmitting) {
    return (
      <Button disabled={true} variant='contained' type='submit'>
        <NonPositionedLoader />
      </Button>
    )
  }
  return (
    <Button variant='contained' type='submit'>
      {buttonText}
    </Button>
  )
}

export default SubmitButton