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

const validationSchema = Yup.object({
  Name: Yup
    .string()
    .required('Observatory Name Is Required'),
  Address: Yup
    .string(),
  IsDefault: Yup.
    boolean()
});

const ObservatoryForm = () => {
  const [isEditable, setIsEditable] = useState(true)
  const formik = useFormik({
    initialValues: {
      Name: "",
      Address: "",
      IsDefault: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsEditable(false)
      await handleSubmit(values);
    },
  });
  const { user } = useAuthentication();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const response = await fetch(`${API_URL}/Observatories`, {
      method: HTTP.POST,
      body: JSON.stringify(values),
      headers: {
        "Authorization": `Bearer ${user?.AuthToken}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    if (data.success) {
      toast(data.message)
      router.push("/Observatories")
    } else {
      toast.error(data.message)
      setIsEditable(true)
    }
  }

  return (
    <DefaultContainer>

      <Typography variant='h2'>Create a New Observatory</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="Name"
            name="Name"
            label="Observatory Name"
            disabled={!isEditable}
            value={formik.values.Name}
            onChange={formik.handleChange}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helperText={formik.touched.Name && formik.errors.Name}
          />

          <TextField
            fullWidth
            id="Address"
            name="Address"
            label="Observatory Address"
            disabled={!isEditable}
            value={formik.values.Address}
            onChange={formik.handleChange}
            error={formik.touched.Address && Boolean(formik.errors.Address)}
            helperText={formik.touched.Address && formik.errors.Address}
          />

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

export default ObservatoryForm