import React from 'react';
import { Formik, Field, Form, useFormikContext } from "formik";
import { TextField } from '@mui/material';
import Loader from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import Button from '@mui/material/Button';

const UploadForm = ({ deviceData }) => {
  return (
    <Formik
      initialValues={{
        deviceId: deviceData.find((d) => d.isDefault === true).name
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="deviceId">Device ID</label>
        <Field id="deviceId" name="deviceId" placeholder="Device ID" />

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