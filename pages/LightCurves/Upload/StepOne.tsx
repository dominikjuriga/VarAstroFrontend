import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Divider, Stack } from '@mui/material';
import { FormControl } from "@mui/material"
import Typography from '@mui/material/Typography';
import Stepper from "../../../components/Stepper/Stepper"

interface Values {
  email: string;
  password: string;
}

const StepOne = () => {
  const [file, setFile] = useState();
  const [star, setStar] = useState();
  const fileInputRef = useRef<HTMLFormElement>();
  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0])
    } else {
      setFile(undefined)
    }
  }

  const clickHiddenFileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef) {
      fileInputRef?.current.click();
    }
  }
  const removeFile = () => {
    console.log(fileInputRef.current)
    fileInputRef.current.value = "";
    setFile(undefined);
  }
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h2">
          Upload A New Light Curve
        </Typography>
        <Formik
          initialValues={{
            starName: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              // alert(JSON.stringify(values, null, 2));
              setStar({
                name: "Vega"
              })
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  component={TextField}
                  name="starName"
                  type="text"
                  disabled={file || star !== undefined}
                  label="Star Name"
                />
                <Divider>or</Divider>
                {file && (
                  <Stack direction="row">
                    <p>{file.name}</p>
                    <Button onClick={removeFile}>X</Button>
                  </Stack>
                )}
                <input ref={fileInputRef} type="file" name="" hidden onChange={handleFileChange} id="" />
                <Button disabled={star !== undefined} variant="outlined" onClick={clickHiddenFileInput}>Select A File</Button>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || star !== undefined}
                  onClick={submitForm}
                >
                  Submit
                </Button>

                {star !== undefined && (
                  <>
                    <Typography>Star {star.name}</Typography>
                    <Field
                      component={TextField}
                      name="starName"
                      type="text"
                      disabled={file || star !== undefined}
                      label="Star Name"
                    />
                  </>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  )
}

export default StepOne