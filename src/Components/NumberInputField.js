import { TextField } from "@mui/material";

export const NumberInputField = ({ label, name, min, max, formik }) => {
  const { handleChange, handleBlur, values, touched, errors } = formik;

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    if (inputValue < min) {
      inputValue = min;
    }

    if (inputValue > max) {
      inputValue = max;
    }

    event.target.value = inputValue;
    handleChange(event);
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      type="number"
      inputProps={{ min: min, max: max }}
      name={name}
      id={name}
      onChange={handleInputChange}
      onBlur={handleBlur}
      value={values[name]}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
    />
  );
};
