// LocationFieldArray.js
import React from 'react';
import { FieldArray } from 'formik';
import { Grid, Button } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { NumberInputField } from "../../Components/NumberInputField";

const LocationFieldArray = ({ formik }) => (
  
  <FieldArray
    name="locations"
    render={arrayHelpers => (
      <div>
        {formik.values.locations && formik.values.locations.length > 0 ? (
          formik.values.locations.map((location, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextInputField
                  label="Location Name"
                  name={`locations.${index}.name`}
                  formik={formik}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <NumberInputField
                  label="Latitude"
                  name={`locations.${index}.coordinates.latitude`}
                  min={-90}
                  max={90}
                  formik={formik}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <NumberInputField
                  label="Longitude"
                  name={`locations.${index}.coordinates.longitude`}
                  min={-180}
                  max={180}
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Button type="button" onClick={() => arrayHelpers.remove(index)} sx={{ fontWeight: 'bold' }}>
                  Remove this location
                </Button>
              </Grid>
            </Grid>
          ))
        ) : null}
        <Button type="button" color="secondary" variant="outlined" sx={{ fontWeight: 'bold' }} onClick={() => arrayHelpers.push({ name: '', coordinates: { latitude: '', longitude: '' } })}>
          Add a location
        </Button>
      </div>
    )}
  />
);

export default LocationFieldArray;