import { Button, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../components/Loader'
import { useApi } from '../../../hooks/useApi'
import { IServiceResponse } from '../../../models'
import { API_URL } from '../../../static/API'
import { HTTP } from '../../../static/HTTP'
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Star Name',
    minWidth: 150,
  },
];

const StepOne = ({ setStar }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [starList, setStarList] = useState();
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const selectStar = () => {
    if (selected.length !== 1) {
      toast.error("You need to select one star.")
      return;
    }
    if (!starList) {
      return
    }
    const star = starList.find((s) => s.id === selected[0])
    if (star) {
      setStar(star);
    }
  }
  return (
    <>

      <Formik
        initialValues={{
          name: ''
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // updateUser(values)
          setLoading(true);
          const response = await fetch(`${API_URL}/Stars/query`, {
            method: HTTP.POST,
            body: JSON.stringify(values.name),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const serviceResponse: IServiceResponse = await response.json();
          if (serviceResponse.success) {
            setStarList(serviceResponse.data)
          } else {
            toast.error(serviceResponse.message)
          }
          setLoading(false);
        }}
      >
        {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (

          <Form>
            {(
              <Stack spacing={2}>

                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Star Name"
                />

                {loading && <Loader />}
                {!loading && (
                  <Button type="submit" variant='contained'>Search Stars</Button>
                )}

              </Stack>
            )}

            {starList && (
              <>
                <DataGrid
                  rows={starList}
                  columns={columns}
                  autoHeight
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelected(newSelectionModel);
                  }}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                />
                <Button disabled={selected.length !== 1} onClick={selectStar}>Select star</Button>
              </>
            )}
          </Form>
        )}
      </Formik >
    </>
  )
}

export default StepOne