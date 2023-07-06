import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const RoleSelect = ({ label, name, value, onChange, error, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        size="small"
        labelId={`${name}-label`}
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleSelect;
