// Components/Header.jsx

import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box bgcolor="primary.main" p={2} display="flex" justifyContent="center">
      <Typography  color="white" textAlign="center">
         TREMP-BOSS MANAGEMENT
      </Typography>
    </Box>
  );
};

export default Header;
