import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Stack, Select, InputLabel, MenuItem } from '@mui/material';
import { Container, Typography } from "@mui/material"

const validationSchema = Yup.object({
  deviceName: Yup
    .string('Enter the name of your device')
    .required('Device Name Is Required'),
  deviceType: Yup
    .string()
    .oneOf(["telescope", "camera"])
    .required(),
});

const ObservatoryForm = () => {
  const [isEditable, setIsEditable] = useState(true)
  const formik = useFormik({
    initialValues: {
      details: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsEditable(false)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditable(true)
    },
  });

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant='h2'>Create a New Observatory</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="details"
              name="text"
              label="Observatory Description (Name, Adress, etc.)"
              disabled={!isEditable}
              value={formik.values.details}
              onChange={formik.handleChange}
              error={formik.touched.details && Boolean(formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
            />

            <Button color="primary" disabled={!isEditable} variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default ObservatoryForm