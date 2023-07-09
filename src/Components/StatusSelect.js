// StatusSelect.jsx
import React from 'react';
import { TextField } from '@mui/material';

const StatusSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  ...other
}) => {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error}
      SelectProps={{ native: true }}
      variant="outlined"
      fullWidth
      {...other}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

export default StatusSelect;
