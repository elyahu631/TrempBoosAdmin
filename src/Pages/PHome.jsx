// Pages/PHome.jsx

import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <Box display="flex" p={2} height="90vh" alignItems="center" justifyContent="space-around">
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="outlined" onClick={() => handleNavigation('/users')}>Users</Button>
        <Button variant="outlined" onClick={() => handleNavigation('/groups')}>Groups</Button>
        <Button variant="outlined" onClick={() => handleNavigation('/tremps')}>Tremps</Button>
        <Button variant="outlined" onClick={() => handleNavigation('/gifts')}>Gifts</Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="outlined" onClick={() => handleNavigation('/manage-system-admin')}>Managing System Admin</Button>
        <Button variant="outlined" onClick={() => handleNavigation('/reports-and-statistics')}>Reports And Statistics</Button>
      </Box>
    </Box>
  );
};

export default PHome;
