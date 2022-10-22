import { Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import { IServiceResponse, IUser } from '../../models';
import { API_URL } from '../../static/API';
import { HTTP } from '../../static/HTTP';

interface IUserForm {
  user: IUser;
  isEditing: boolean;
}

const UserForm = ({ user, isEditing }: IUserForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuthentication();
  return (

    <Formik
      initialValues={{
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        await updateUser(values)
        setIsSubmitting(false);
      }}
    >
      {({ values, submitForm, resetForm, touched, errors }) => (

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
              disabled={!isEditing}
              label="First Name"
            />
            <Field
              component={TextField}
              name="lastName"
              type="text"
              disabled={!isEditing}
              label="Last Name"
            />

            {isEditing && (
              <SubmitButton isSubmitting={isSubmitting} buttonText={`Save Changes`} />
            )}

          </Stack>
        </Form>
      )}
    </Formik >
  )
}

export default UserForm