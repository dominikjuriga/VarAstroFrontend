import React, { useState, useRef, Key } from 'react'
import Card from '../Card'
import s from "../../styles/LightCurveForm.module.css"

interface IProps {
  nextStep: () => void
}

const UploadStepOne: React.FC<IProps> = ({ nextStep }) => {
  const lightCurveFileRef = useRef(null)
  const formRef = useRef(null)
  const initialState = {
    raHour: "", raMinute: "", raSecond: "", raMillisecond: "", decDegree: "", decArcmin: "", decArcsec: "", decMilliarcsecond: ""
  }
  const [formState, setFormState] = useState(initialState)
  const [hasError, setHasError] = useState(false)

  const resetValuesToDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormState(initialState)
  }

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleFileUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('change')
    lightCurveFileRef.current.value = null;
    lightCurveFileRef.current?.click()
  }

  const getRandomParsedData = () => {
    // simulate API call to parse the file
    return {
      raHour: "5", raMinute: "48", raSecond: "24", raMillisecond: "012", decDegree: "30", decArcmin: "57", decArcsec: "03", decMilliarcsecond: "59"
    }
  }

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value !== null) {
      setFormState(getRandomParsedData())
    }
  }

  const validateInputs = () => {
    Object.keys(formState).forEach((key: any) => {
      console.log(`${key}: "${formState[key]}"`)
      if (formState[key] === "") {
        setHasError(true)
      }
    })
    return !hasError
  }

  const validateAndProgress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (validateInputs()) {
      nextStep()
    }
  }

  return (
    <>

      <Card title='Upload a light curve'>

        <form onSubmit={handleSubmit} ref={formRef} className={s.coordinateForm}>
          {hasError && <p>There is an error</p>}
          <p>Right Ascension (RA)</p>
          <div className={s.coordinateField}>
            <div>
              <label htmlFor="raHour">Hours</label>
              <input value={formState.raHour} onChange={handleFormInputChange} required type="number" name="raHour" />
            </div>
            <div>
              <label htmlFor="raMinute">Minutes</label>
              <input value={formState.raMinute} onChange={handleFormInputChange} required type="number" name="raMinute" />
            </div>
            <div>
              <label htmlFor="raSecond">Seconds</label>
              <input value={formState.raSecond} onChange={handleFormInputChange} required type="number" name="raSecond" />
            </div>
            <div>
              <label htmlFor="raMilliecond">Milliseconds</label>
              <input value={formState.raMillisecond} onChange={handleFormInputChange} required type="number" name="raMillisecond" />
            </div>
          </div>
          <p>Declination (DEC)</p>
          <div className={s.coordinateField}>
            <div>
              <label htmlFor="decDegree">Degrees</label>
              <input value={formState.decDegree} onChange={handleFormInputChange} required type="number" name="decDegree" />
            </div>
            <div>
              <label htmlFor="decArcmin">Armins</label>
              <input value={formState.decArcmin} onChange={handleFormInputChange} required type="number" name="decArcmin" />
            </div>
            <div>
              <label htmlFor="decArcsec">Arcseconds</label>
              <input value={formState.decArcsec} onChange={handleFormInputChange} required type="number" name="decArcsec" />
            </div>
            <div>
              <label htmlFor="decMilliarcsec">Arcmilliseconds</label>
              <input value={formState.decMilliarcsecond} onChange={handleFormInputChange} required type="number" name="decMilliarcsec" />
            </div>
          </div>

          <button onClick={resetValuesToDefault}>Reset values</button>

          <hr />

          <p>or</p>
          <hr />
          <input onChange={handleFileUploadChange} hidden type="file" ref={lightCurveFileRef} name="light-curve-file" />
          <button onClick={handleFileUploadClick}>Upload a file</button>
          <hr />
        </form>

        <button onClick={validateAndProgress}>Next step</button>
      </Card>
    </>
  )
}

export default UploadStepOne