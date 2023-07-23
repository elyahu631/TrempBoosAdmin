import { Avatar, Button, Box, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { grey } from "@mui/material/colors";

export const FileInputField = ({ label, name, formik }) => {
  const { setFieldValue, values } = formik;

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log(file);
    setFieldValue(name, file);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2 
      }}
    >
      <Avatar
        src={
          values[name] instanceof File || values[name] instanceof Blob
            ? URL.createObjectURL(values[name])
            : values[name]
        }
        sx={{ 
          width: 100, 
          height: 100, 
          borderColor: grey[500], 
          borderWidth: 1, 
          borderStyle: 'dashed'
        }}
      >
        {!values[name] && <PhotoCamera sx={{ fontSize: 40, color: grey[500] }}/>}
      </Avatar>
      <input
        accept="image/*"
        id={name}
        name={name}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor={name}>
        <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
          {label}
        </Button>
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <Typography color="error">{formik.errors[name]}</Typography>
      )}
    </Box>
  );
};
