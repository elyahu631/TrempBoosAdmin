import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useState } from 'react';

export const Filters = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [trempType, setTrempType] = useState('');

  const handleFilterChange = () => {

    onFilterChange({
      startDate,
      endDate,
      trempType
    });
  };

  return (
    <div style={styles.container}>
      <h2>Filters</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            if (newValue && newValue instanceof Date) {
              setStartDate(newValue);
            }
          }}
          textField={(params) => <TextField {...params} fullWidth />}
          style={styles.datePicker}
          format="dd/MM/yy"
          maxDate={endDate}
        />

        <div style={{ height: '20px' }}></div>

        <DesktopDatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          textField={(params) => <TextField {...params} fullWidth />}
          style={styles.datePicker}
          minDate={startDate}
          format="dd/MM/yy"
          maxDate={new Date()}
        />
      </LocalizationProvider>




      <FormControl fullWidth margin="normal" style={styles.formControl}>
        <InputLabel>Tremp Type</InputLabel>
        <Select
          value={trempType}
          onChange={e => setTrempType(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="driver">Driver</MenuItem>
          <MenuItem value="hitchhiker">Hitchhiker</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleFilterChange} style={styles.button}>
        Apply Filters
      </Button>
    </div>
  );
};

const styles = {
  container: {
    width: '320px',
    padding: '2rem',
    border: 'none',
    position: 'sticky',
    top: '2rem',
    backgroundColor: '#ffffff',
    background: 'linear-gradient(135deg, #fafafa, #eaeaea)',  // Gentle gradient
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',  // Layered shadows for depth
    borderRadius: '15px',  // Increased the roundness
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',  // Slight scale on hover for interactive feedback
    }
  },
  datePicker: {
    backgroundColor: 'transparent',
    borderBottom: '2px solid #e0e0e0',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    '&:hover': {
      borderBottom: '2px solid #b0b0b0',
    }
  },
  formControl: {
    marginBottom: '1.5rem',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    borderBottom: '2px solid #e0e0e0',
    '&:hover': {
      borderBottom: '2px solid #b0b0b0',
    }
  },
  button: {
    marginTop: '1rem',
    width: '100%',
    borderRadius: '50px',
    backgroundColor: '#370000',
    transition: 'background-color 0.3s, transform 0.3s, boxShadow 0.3s',
    '&:hover': {
      backgroundColor: '#5390ff',
      transform: 'translateY(-3px)',  // Elevating the button on hover
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    },
    '&:active': {
      transform: 'translateY(-1px)',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
    }
  },
};



