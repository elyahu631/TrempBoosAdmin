import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const RoleSelect = ({ label, name, value, onChange, error }) => {
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
        error={error}
      >
        <MenuItem value="helpdesk">Help Desk</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleSelect;
