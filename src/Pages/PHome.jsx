import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../Contexts/LoginContext";
import { useContext } from 'react';

const PHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);

  const handleNavigation = (path) => {
    navigate(path);
  }

  const buttonStyle = {
    fontWeight: 'bold',
    border: 'solid 3px',
    fontFamily: 'Arial',
    marginTop: '1rem'  // give space between buttons
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      height="80vh"
    >
      {user && (
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          p={2}
          alignItems="center"
          gap={2}
        >
          <Typography variant="h5" component="h2" >
            Welcome, {user.first_name} {user.last_name}!
          </Typography>
          <Typography>
            ({user.email})
          </Typography>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        p={2}
        height="80vh"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box display="flex" flexDirection="column" gap={2} >
          <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/users')}>Users</Button>
          <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/groups')}>Groups</Button>
          <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/tremps')}>Tremps</Button>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {(user && user.role !== 'helpdesk') && (
            <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/manage-system-admin')}>Managing System Admin</Button>
          )}
          <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/reports-and-statistics')}>Statistics Dashboard</Button>
          <Button style={buttonStyle} variant="outlined" onClick={() => handleNavigation('/group-request')}>Group Request</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PHome;


