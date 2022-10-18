import React, { useMemo } from 'react';
import { Formik, Field, Form, useFormikContext, FormikContextType } from "formik";
import { TextField, Select } from 'formik-mui';
import { FormControl, MenuItem, Stack } from '@mui/material';
import Loader from '../../../components/Loader';
import { Box } from '@mui/system';
import { useApi } from '../../../hooks/useApi';
import Button from '@mui/material/Button';

interface IDeviceData {
  id: number;
  name: string;
  type: string;
  isDefault: boolean;
}

interface IUploadForm {
  deviceData: IDeviceData[]
}

const UploadForm = ({ deviceData }: IUploadForm) => {
  const [defaultCameraId, defaultTelescopeId] = useMemo(() => {
    const cameraId = deviceData.find((d) => d.isDefault === true && d.type === "camera")?.id;
    const telescopeId = deviceData.find((d) => d.isDefault === true && d.type === "telescope")?.id
    return [cameraId ? cameraId : "", telescopeId]
  }, [deviceData]);


  if (!deviceData) {
    return <Loader />
  }
  return (
    <Formik
      initialValues={{
        defaultCameraId,
        defaultTelescopeId
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <Stack spacing={2}>
          <Field
            component={Select}
            type="text"
            fullWidth
            label="Camera"
            name="defaultCameraId"
          >
            <MenuItem value="">{"Not Specified"}</MenuItem>
            {deviceData.filter((device) => device.type === "camera").map((d) => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </Field>
          <Field
            component={Select}
            type="text"
            fullWidth
            label="Telescope"
            name="defaultTelescopeId"
          >
            <MenuItem value="">{"Not Specified"}</MenuItem>
            {deviceData.filter((device) => device.type === "telescope").map((d) => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </Field>
          <Button type='submit'>Submit</Button>
        </Stack>
      </Form>
    </Formik>
  )
}

const Upload = () => {
  const { data: deviceData } = useApi({ path: "Devices" })
  console.log(deviceData)

  if (deviceData) {
    return (
      <UploadForm deviceData={deviceData} />
    )
  }
  return <Loader />
}

export default Upload