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
});

const Login = () => {
  const { user, login } = useAuthentication();
  const handleSubmit = async (values: any) => {
    await login(values.EmailAddress, values.Password);
    console.log({ user })
  }
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      EmailAddress: 'user@example.com',
      Password: 'stringst',
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
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Login