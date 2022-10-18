import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react'
import * as Yup from "yup"

const Password = () => {

  const validationSchema = Yup.object({
    currentPassword: Yup
      .string()
      .required("Please enter your current password."),
    newPassword: Yup
      .string()
      .min(8, "This field must be atleast 8 characters long")
      .required("Please enter a new password."),
    passwordConfirmation: Yup
      .string()
      .min(8, "This field must be atleast 8 characters long")
      .oneOf([Yup.ref("newPassword"), null], "The passwords do not match.")
      .required("Please, confirm your new password.")
  })

  return (
    <>
      <Stack spacing={2}>

        <Typography variant='h2'>Change Password</Typography>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            passwordConfirmation: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (

            <Form>

              <Stack spacing={2}>
                <Field
                  component={TextField}

                  name="currentPassword"
                  type="password"
                  label="Current Password"
                />
                <Field
                  component={TextField}
                  name="newPassword"
                  type="password"
                  label="New Password"
                />
                <Field
                  component={TextField}
                  name="passwordConfirmation"
                  type="password"
                  label="Confirm New Password"
                />

                <Button variant='contained' type='submit'>Submit</Button>
              </Stack>
            </Form>)}
        </Formik>
      </Stack>
    </>
  )
}

export default Password