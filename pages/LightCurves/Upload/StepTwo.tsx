import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Formik, Field, Form } from "formik";
import { TextField, Select, Switch } from 'formik-mui';
import { FormControlLabel, Grid, MenuItem, Stack, Divider, Tooltip } from '@mui/material';
import Loader from '../../../components/Loader';
import { useApi } from '../../../hooks/useApi';
import Button from '@mui/material/Button';
import * as Yup from "yup"
import { toast } from 'react-toastify';
import { API_URL } from '../../../static/API';
import { IObservatory, IDevice, IServiceResponse } from '../../../models';
import { HTTP } from '../../../static/HTTP';
import useAuthentication from '../../../features/auth/hooks/useAuthentication';
import { useRouter } from 'next/router';


interface IUploadForm {
  deviceData: IDevice[],
  observatoryData: IObservatory[]
}

const validationSchema = Yup.object({
  Camera: Yup
    .number(),
  Observatory: Yup
    .number(),
  Telescope: Yup
    .number(),
  JulianDateFormat: Yup
    .string()
    .oneOf(["heliocentric", "geocentric"]).required(),
  PhotometricSystem: Yup.string().oneOf(["instrumental", "standard"]).required(),
  Aperture: Yup.number().required("Please, specify the aperture value"),
  Filter: Yup.string().required("Please, specify the filter type (or none)"),
  ParsedFileId: Yup.number().required(),
  IsPublic: Yup.boolean(),
});

const UploadForm = ({ deviceData, observatoryData }: IUploadForm) => {
  const [defaultCameraId, defaultTelescopeId] = useMemo(() => {
    if (deviceData) {
      const CameraId = deviceData.find((d) => d.isDefault === true && d.type === "camera")?.id;
      const TelescopeId = deviceData.find((d) => d.isDefault === true && d.type === "telescope")?.id
      return [CameraId ? CameraId : "", TelescopeId ? TelescopeId : ""]
    }
    return ["", ""]
  }, [deviceData]);
  const defaultObservatoryId = useMemo(() => {
    if (observatoryData) {
      const observatory = observatoryData.find((o) => o.isDefault === true)
      return observatory ? observatory.id : ""
    }
  }, [observatoryData])
  const router = useRouter();
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const { jwt } = useAuthentication();
  const defaultInitials = {
    CameraId: defaultCameraId,
    TelescopeId: defaultTelescopeId,
    ObservatoryId: defaultObservatoryId,
    JulianDateFormat: "heliocentric",
    PhotometricSystem: "instrumental",
    ParsedFileId: "",
    Aperture: "",
    Filter: "",
    IsPublic: true
  }
  const [initialValues, setInitialValues] = useState(defaultInitials)

  useEffect(() => {
    const postFile = async () => {
      if (!file) {
        toast.error("File cannot be empty");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${API_URL}/LightCurves/file`, {
        method: "POST",
        body: formData
      })
      const serviceResponse = await response.json();
      if (serviceResponse.success) {
        toast(serviceResponse.message)
        const tmp = JSON.parse(serviceResponse.data.observationMetaData)

        let newInitial = { ...initialValues };
        if (tmp.VarAperture) {
          newInitial.Aperture = tmp.VarAperture
        }
        if (tmp.JD) {
          newInitial.JulianDateFormat = tmp.JD
        }
        if (tmp.Filter) {
          newInitial.Filter = tmp.Filter
        }
        newInitial.ParsedFileId = serviceResponse.data.id;
        setInitialValues(newInitial)
      } else {
        toast.error(serviceResponse.message)
      }
    }

    if (file !== undefined) {
      postFile();
    }
  }, [file])

  const handleFileChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0])
    } else {
      setFile(undefined)
    }
  }

  const clickHiddenFileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(undefined);
  }
  const resetForm = () => {
    setInitialValues(defaultInitials);
    removeFile();
  }


  if (deviceData && observatoryData) {
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (!file) {
            toast.error("Please insert a file")
            return
          }
          const response = await fetch(`${API_URL}/LightCurves`, {
            method: HTTP.POST,
            body: JSON.stringify(values),
            headers: {
              "Authorization": `Bearer ${jwt}`,
              "Content-Type": "application/json"
            }
          })
          const serviceResponse: IServiceResponse = await response.json()
          if (serviceResponse.success) {
            toast(serviceResponse.message);
            router.push(`/LightCurves/${serviceResponse.data.id}`)
          } else {
            toast.error(serviceResponse.message);

          }
        }}
      >
        {({ values, submitForm, isSubmitting, touched, errors }) => (
          <Form>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Divider>Observation File</Divider>
                <Field
                  type="text"
                  hidden
                  name="ParsedFileId" />
              </Grid>

              <Grid item xs={12}>
                <Tooltip title="Metadata will be automatically filled in if the file is in correct format">
                  <Button fullWidth variant="outlined" onClick={clickHiddenFileInput}>Select A File</Button>
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                {file && (
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <span>{file.name}</span>
                    <Button onClick={removeFile}>X</Button>
                  </Stack>
                )}
                <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
              </Grid>

              <Grid item xs={12}>
                <Divider>Observation Metadata</Divider>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={Select}
                  type="text"
                  fullWidth
                  error={touched['CameraId'] && !!errors['CameraId']}
                  label="Camera"
                  name="CameraId"
                >
                  <MenuItem value="">{"Not Specified"}</MenuItem>
                  {deviceData.filter((device) => device.type === "camera").map((d) => (
                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={Select}
                  type="text"
                  fullWidth
                  label="Telescope"
                  name="TelescopeId"
                >
                  <MenuItem value="">{"Not Specified"}</MenuItem>
                  {deviceData.filter((device) => device.type === "telescope").map((d) => (
                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={Select}
                  type="text"
                  fullWidth
                  label="Observatory"
                  name="ObservatoryId"
                >
                  <MenuItem value="">{"Not Specified"}</MenuItem>
                  {observatoryData.map((d) => (
                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={Select}
                  type="text"
                  fullWidth
                  label="Julian Date Format"
                  name="JulianDateFormat"
                >
                  <MenuItem value="heliocentric">Heliocentric</MenuItem>
                  <MenuItem value="geocentric">Geocentric</MenuItem>
                </Field>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={Select}
                  type="text"
                  fullWidth
                  label="Photometric System"
                  name="PhotometricSystem"
                >
                  <MenuItem value="instrumental">Instrumental</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                </Field>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  type="text"
                  fullWidth
                  label="Aperture"
                  name="Aperture"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  type="text"
                  fullWidth
                  label="Filter Type"
                  name="Filter"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Field component={Switch} type="checkbox" name="IsPublic" />
                  }
                  label="Is Public"
                />
              </Grid>

              <Grid item xs={9}>
                <Button fullWidth variant='contained' type='submit'>Submit</Button>
              </Grid>
              <Grid item xs={3}>
                <Button fullWidth variant='outlined' onClick={resetForm}>Reset Form</Button>
              </Grid>
            </Grid>
          </Form>

        )}
      </Formik >
    )
  }
  return <Loader />
}

const Upload = () => {
  const { data: deviceData } = useApi({ path: "Devices" })
  const { data: observatoryData } = useApi({ path: "Observatories" })

  if (deviceData) {
    return (
      <UploadForm
        deviceData={deviceData}
        observatoryData={observatoryData}
      />
    )
  }
  return <Loader />
}

export default Upload