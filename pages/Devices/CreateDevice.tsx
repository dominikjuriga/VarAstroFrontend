import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { Typography } from "@mui/material"
import { HTTP } from '../../static/HTTP';
import { API_URL } from '../../static/API';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import DefaultContainer from '../../components/DefaultContainer';
import { InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';




const validationSchema = Yup.object({
  Name: Yup
    .string()
    .required('Device Name Is Required'),
  Type: Yup
    .string()
    .required("Device Type Is Required"),
  IsDefault: Yup.
    boolean()
});

const DeviceForm = () => {
  const [isEditable, setIsEditable] = useState(true)
  const formik = useFormik({
    initialValues: {
      Name: "",
      Type: "camera",
      IsDefault: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsEditable(false)
      await handleSubmit(values);
    },
  });
  const { jwt, refetchSessionData } = useAuthentication();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const response = await fetch(`${API_URL}/Devices`, {
      method: HTTP.POST,
      body: JSON.stringify(values),
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    if (data.success) {
      toast(data.message)
      if (values.IsDefault) {
        refetchSessionData()
      }
      router.push("/Devices")
    } else {
      toast.error(data.message)
      setIsEditable(true)
    }
  }

  return (
    <DefaultContainer>

      <Typography variant='h2'>Create a New Device</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="Name"
            name="Name"
            label="Device Name"
            disabled={!isEditable}
            value={formik.values.Name}
            onChange={formik.handleChange}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helperText={formik.touched.Name && formik.errors.Name}
          />

          <Stack>
            <InputLabel id="deviceTypeLabel">Device Type</InputLabel>
            <Select
              labelId="deviceTypeLabel"
              id='Type'
              name='Type'
              value={formik.values.Type}
              onChange={formik.handleChange}
              fullWidth
              label="Observatory"
            >
              <MenuItem value="camera">
                Camera
              </MenuItem>
              <MenuItem value="telescope">
                Telescope
              </MenuItem>
            </Select>
          </Stack>

          <FormControlLabel control={<Checkbox
            id="IsDefault"
            name="IsDefault"
            disabled={!isEditable}
            value={formik.values.IsDefault}
            onChange={formik.handleChange}

          />} label="Set As Default" />

          <Button color="primary" disabled={!isEditable} variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </DefaultContainer>
  );
};

export default DeviceForm