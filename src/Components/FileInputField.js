import { Avatar, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export const FileInputField = ({ label, name, formik }) => {
  const { setFieldValue, values } = formik;

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
  };

  return (
    <>
      <input
        accept="image/*"
        id={name}
        name={name}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor={name}>
        <Button variant="outlined" component="span">
          {label}
        </Button>
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
      <Avatar
        src={
          values[name] instanceof File || values[name] instanceof Blob
            ? URL.createObjectURL(values[name])
            : values[name]
        }
        style={{ width: 70, height: 70, marginLeft: "10px" }}
      >
        {!values[name] && <PhotoCamera />}
      </Avatar>
    </>
  );
};
