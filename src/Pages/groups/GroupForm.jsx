// GroupForm.js
import { useFormik } from "formik";
import { Button, Card, Grid, Typography, Container, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, IconButton,Box } from "@mui/material";
import { TextInputField } from "../../Components/TextInputField";
import { FileInputField } from "../../Components/FileInputField";
import MainSelect from "../../Components/Select";
import LocationInput from "./LocationInput";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const LocationsTable = ({ locationsList, handleDeleteLocation }) => {
  return (
    <>
      <Typography variant="h6">Selected Locations:</Typography>
      <Box sx={{ height: 300, overflowY: "auto" }}>
        <TableContainer>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationsList.map((loc, idx) => (
                <TableRow key={idx}>
                  <TableCell>{loc.name}</TableCell>
                  <TableCell>{loc.coordinates.latitude}</TableCell> 
                  <TableCell>{loc.coordinates.longitude}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteLocation(idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};


const GroupForm = ({ initialValues, validationSchema, onSubmit, formTitle, submitButtonTitle, initialLocations = [] }) => {

  const [locationsList, setLocationsList] = useState(initialLocations); // <-- Use initialLocations here
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });

  const setLocation = (location) => {
    console.log(selectedLocation);
    setSelectedLocation(location);
  };

  const handleAddLocation = (loc) => {
    if (loc) {
      const newLoc = {
        name: loc.name,
        coordinates: {
          latitude: loc.lat,
          longitude: loc.lng
        }
      };
  
      setLocationsList([...locationsList, newLoc]);
    }
  };
  

  const handleDeleteLocation = (idx) => {
    const updatedLocations = [...locationsList];
    updatedLocations.splice(idx, 1);
    setLocationsList(updatedLocations);
  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => onSubmit(values, locationsList)  
  });
  


  return (
    <Container>
      <Grid
        container
        sx={{
          minHeight: "80vh",
          maxHeight: "100vh",
          marginBottom: "50px"
        }}
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={14} sm={12} md={12} lg={15}>
          <Card sx={{ padding: "20px", background: "transparent", width: '100%', marginBottom: '30px' }}>
            <Typography variant="h4" component="h2" align="center" mb={2}>
              {formTitle}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <FileInputField
                    label="Group Image"
                    name="image_URL"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Group Name"
                    name="group_name"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Group Description"
                    name="description"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInputField
                    label="Admin Email"
                    name="admin_email"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MainSelect
                    label="Active"
                    name="active"
                    value={formik.values.active || "active"}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.active && formik.errors.active)}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" align="center" sx={{ textDecoration: 'underline' }}>
                    Location
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocationInput
                    onAddLocation={handleAddLocation}
                    setLocation={setLocation}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocationsTable
                    locationsList={locationsList}
                    handleDeleteLocation={handleDeleteLocation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {submitButtonTitle}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

};

export default GroupForm;
