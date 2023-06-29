// Components/Header.jsx

import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box bgcolor="primary.main" p={2} display="flex" justifyContent="center">
      <Typography variant="h5" color="white">
         TREMP-BOSS MANAGEMENT
      </Typography>
    </Box>
  );
};

export default Header;
