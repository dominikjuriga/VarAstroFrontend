import { Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react'
import { toast } from 'react-toastify';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import { IServiceResponse, IUser } from '../../models';
import { API_URL } from '../../static/API';
import { HTTP } from '../../static/HTTP';

interface IUserForm {
  user: IUser;
  disabled: boolean;
}


const UserForm = ({ user, disabled }: IUserForm) => {
  const { updateUser } = useAuthentication();
  return (

    <Formik
      initialValues={{
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }}
      onSubmit={async (values, { setSubmitting }) => {
        updateUser(values)
      }}
    >
      {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (

        <Form>
          <Stack spacing={2}>

            <Field
              component={TextField}
              name="email"
              type="email"
              disabled={true}
              label="Email"
            />
            <Field
              component={TextField}
              name="firstName"
              type="text"
              disabled={disabled}
              label="First Name"
            />
            <Field
              component={TextField}
              name="lastName"
              type="text"
              disabled={disabled}
              label="Last Name"
            />

            {!disabled && (
              <Button type="submit" variant='contained'>Save Changes</Button>
            )}

          </Stack>
        </Form>
      )}
    </Formik >
  )
}

export default UserForm