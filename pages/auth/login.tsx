import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Stack } from '@mui/material';
import { useApiPost } from '../../hooks/useApi';
import Loader from '../../components/Loader';
import { API_URL } from '../../static/API';
import { IServiceResponse, isResponseSuccessul } from '../../helpers';
import { toast } from 'react-toastify';

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
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = (values: any) => {
    setLoading(true);
    fetch(`${API_URL}/Auth/login`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!isResponseSuccessul(data)) {
          toast.error(data.message)
          return;
        }
        setSuccess(true)
      })

    setLoading(false)
  }

  useEffect(() => {
    toast.error("Kappa")
  }, [])

  const formik = useFormik({
    initialValues: {
      EmailAddress: 'foobar@example.com',
      Password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  if (loading) {
    return <Loader />
  }

  if (!loading && success) {
    return "Logged In"
  }

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