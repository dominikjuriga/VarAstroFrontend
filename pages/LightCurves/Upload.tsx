import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useApi } from '../../hooks/useApi';
import { Stack } from '@mui/system';
import useAuthentication from '../../features/auth/hooks/useAuthentication';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

const UploadNew = () => {
  const [isEditable, setIsEditable] = useState(true)
  const { data: observatoryData } = useApi({ path: "Observatories" })
  const { data: deviceData } = useApi({ path: "Devices" })
  const { user } = useAuthentication();
  const router = useRouter();
  useEffect(() => {
    if (!user)
      router.push("/login")

  }, [])
  const validationSchema = Yup.object({
    CameraDeviceId: Yup
      .number(),
    TelescopeDeviceId: Yup
      .number(),
    ObservatoryId: Yup
      .number(),
  });

  const handleSubmit = async (values: any) => {
    console.log("submitting")
  }
  const formik = useFormik({
    initialValues: {
      CameraDeviceId: user?.defaultCameraDeviceId ?? 0,
      TelescopeDeviceId: user?.defaultTelescopeDeviceId ?? "",
      ObservatoryId: user?.defaultObservatoryId ?? 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsEditable(false)
      await handleSubmit(values);
    },
  });

  if (observatoryData && deviceData) {
    return (
      <form>
        <Stack spacing={2}>
          <Stack>
            <InputLabel id="observatoryLabel">Observatory</InputLabel>
            <Select
              labelId="observatoryLabel"
              id='ObservatoryId'
              name='ObservatoryId'
              value={formik.values.ObservatoryId}
              onChange={formik.handleChange}
              fullWidth
              label="Observatory"
            >
              <MenuItem value={0}>
                None
              </MenuItem>
              {observatoryData.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack>
            <InputLabel id="cameraLabel">Camera</InputLabel>
            <Select
              labelId="cameraLabel"
              id='CameraDeviceId'
              name='CameraDeviceId'
              value={formik.values.CameraDeviceId}
              onChange={formik.handleChange}
              fullWidth
              label="Camera"
            >
              <MenuItem value="">
                None
              </MenuItem>
              {deviceData.map((item: any) => {
                if (item.type === "camera")
                  return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              })}
            </Select>
          </Stack>

          <Stack>
            <InputLabel id="telescopeLabel">Telescope</InputLabel>
            <Select
              labelId="telescopeLabel"
              id='TelescopeDeviceId'
              name='TelescopeDeviceId'
              value={formik.values.TelescopeDeviceId}
              onChange={formik.handleChange}
              fullWidth
              label="Camera"
            >
              <MenuItem value="">
                None
              </MenuItem>
              {deviceData.map((item: any) => {
                if (item.type === "telescope")
                  return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              })}
            </Select>
          </Stack>


        </Stack>
      </form>
    )
  }

  return <Loader />
}

export default UploadNew