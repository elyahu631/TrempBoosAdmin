import { TextField } from "@mui/material";

export const TextInputField = ({ label, name, formik,type = "text"}) => {
  const { handleChange, handleBlur, values, touched, errors } = formik;

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      type={type}
      name={name}
      id={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
      placeholder={`Enter your ${label.toLowerCase()}`}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
    />
  );
};
