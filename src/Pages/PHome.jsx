import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  const buttonStyle = {
    fontWeight: 'bold', 
    border: 'solid 3px',
    fontFamily:'Arial'
  };

  return (
    <Box 
      display="flex" 
      flexDirection={{ xs: 'column', sm: 'row' }} 
      p={2} 
      height="80vh" 
      alignItems="center" 
      justifyContent="space-around" 
    >
      <Box display="flex" flexDirection="column" gap={2} >
        <Button  style={buttonStyle}  variant="outlined" onClick={() => handleNavigation('/users')}>Users</Button>
        <Button  style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/groups')}>Groups</Button>
        <Button  style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/tremps')}>Tremps</Button>
      </Box>
      <Box   display="flex" flexDirection="column" gap={2} >
        <Button  style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/manage-system-admin')}>Managing System Admin</Button>
        <Button  style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/reports-and-statistics')}>Reports And Statistics</Button>
        <Button  style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/group-request')}>Group Request</Button>
      </Box>
    </Box>
  );
};

export default PHome;
