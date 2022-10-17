import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Stack } from '@mui/material';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
  EmailAddress: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  Password: Yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  ConfirmPassword: Yup
    .string()
    .oneOf([Yup.ref("Password"), null], "Please, repeat the correct password.")
    .required("You need to confirm your password."),
  FirstName: Yup
    .string()
    .required("First name must have at least 2 characters.")
    .min(2),
  LastName: Yup
    .string()
    .required("Last name must have at least 2 characters.")
    .min(2),
});

const Register = () => {
  const { user, register } = useAuthentication();
  const handleSubmit = async (values: any) => {
    await register(values);
  }
  const router = useRouter();
  useEffect(() => {
    if (user !== undefined) {
      router.push("/")
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      EmailAddress: 'asd@gmail.com',
      Password: 'asdasdasd',
      ConfirmPassword: 'asdasdasd',
      FirstName: 'asdasd',
      LastName: 'asdasd'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="EmailAddress"
            name="EmailAddress"
            label="Email Address"
            type="email"
            value={formik.values.EmailAddress}
            onChange={formik.handleChange}
            error={formik.touched.EmailAddress && Boolean(formik.errors.EmailAddress)}
            helperText={formik.touched.EmailAddress && formik.errors.EmailAddress}
          />
          <TextField
            fullWidth
            id="Password"
            name="Password"
            label="Password"
            type="password"
            value={formik.values.Password}
            onChange={formik.handleChange}
            error={formik.touched.Password && Boolean(formik.errors.Password)}
            helperText={formik.touched.Password && formik.errors.Password}
          />
          <TextField
            fullWidth
            id="ConfirmPassword"
            name="ConfirmPassword"
            label="Confirm Password"
            type="Password"
            value={formik.values.ConfirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.ConfirmPassword && Boolean(formik.errors.ConfirmPassword)}
            helperText={formik.touched.ConfirmPassword && formik.errors.ConfirmPassword}
          />
          <TextField
            fullWidth
            id="FirstName"
            name="FirstName"
            label="First Name"
            type="text"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
            helperText={formik.touched.FirstName && formik.errors.FirstName}
          />
          <TextField
            fullWidth
            id="LastName"
            name="LastName"
            label="Last Name"
            type="text"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
            helperText={formik.touched.LastName && formik.errors.LastName}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Register