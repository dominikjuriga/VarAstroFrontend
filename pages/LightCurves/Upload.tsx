import React, { useMemo } from 'react';
import { Formik, Field, Form, useFormikContext, FormikContextType } from "formik";
import { TextField } from '@mui/material';
import Loader from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
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
    return [cameraId, telescopeId]
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
        <label htmlFor="defaultCameraId">Device ID</label>
        <Field id="defaultCameraId" name="defaultCameraId" placeholder="Camera ID" />
        <label htmlFor="defaultTelescopeId">Device ID</label>
        <Field id="defaultTelescopeId" name="defaultTelescopeId" placeholder="Telescope ID" />
        <TextField id="defaultTelescopeId" name="defaultTelescopeId" placeholder="Telescope ID" />

        <Button type='submit'>Submit</Button>
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