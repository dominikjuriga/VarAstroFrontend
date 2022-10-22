import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup"
import SubmitButton from '../../components/SubmitButton';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import { IServiceResponse } from '../../models';
import { API_URL } from '../../static/API';
import { HTTP, ContentTypeJson } from '../../static/HTTP';


const Password = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { jwt } = useAuthentication();
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

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  }

  return (
    <>
      <Stack spacing={2}>

        <Typography variant='h2'>Change Password</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsSubmitting(true)
            const response = await fetch(`${API_URL}/Auth/ChangePassword`, {
              method: HTTP.POST,
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
              }
            });
            const serviceResponse: IServiceResponse = await response.json()
            if (serviceResponse.success) {
              toast(serviceResponse.message)
              resetForm();
            } else {
              toast.error(serviceResponse.message)

            }
            setIsSubmitting(false)
          }}
        >
          {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (

            <Form>
              <Stack spacing={2}>
                <Field
                  component={TextField}
                  disabled={isSubmitting}
                  name="currentPassword"
                  type="password"
                  label="Current Password"
                />
                <Field
                  component={TextField}
                  disabled={isSubmitting}
                  name="newPassword"
                  type="password"
                  label="New Password"
                />
                <Field
                  component={TextField}
                  disabled={isSubmitting}
                  name="passwordConfirmation"
                  type="password"
                  label="Confirm New Password"
                />

                <SubmitButton isSubmitting={isSubmitting} />
              </Stack>
            </Form>)}
        </Formik>
      </Stack>
    </>
  )
}

export default Password