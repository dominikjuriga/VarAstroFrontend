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

const DeviceForm = () => {
  const [isEditable, setIsEditable] = useState(true)
  const formik = useFormik({
    initialValues: {
      deviceName: '',
      deviceType: 'telescope',
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
        <Typography variant='h2'>Create a New Device</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="deviceName"
              name="text"
              label="Device Description"
              disabled={!isEditable}
              value={formik.values.deviceName}
              onChange={formik.handleChange}
              error={formik.touched.deviceName && Boolean(formik.errors.deviceName)}
              helperText={formik.touched.deviceName && formik.errors.deviceName}
            />

            {/* <InputLabel id="deviceType">Device Type</InputLabel> */}
            <Select
              fullWidth
              id="deviceType"
              name="deviceType"
              disabled={!isEditable}
              // labelId="deviceType"
              value={formik.values.deviceType}
              label="Device Type"
              onChange={formik.handleChange}
            >
              <MenuItem value={`telescope`}>Telescope</MenuItem>
              <MenuItem value={`camera`}>Camera</MenuItem>
            </Select>

            <Button color="primary" disabled={!isEditable} variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default DeviceForm