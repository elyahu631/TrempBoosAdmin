import { Box, Typography, Checkbox } from "@mui/material";

export const CheckboxInputField = ({ label, name, formik }) => {
  const { handleChange, values } = formik;

  return (
    <Box display="flex" alignItems="center">
      <Checkbox name={name} checked={!!values[name]} onChange={handleChange} />
      <Typography variant="body1">{label}</Typography>
    </Box>
  );
};
