// GroupReqsHeader.jsx

import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const GroupReqsHeader = ({handleRefresh }) => (
  <>
    <Typography variant="h4">Group Requests</Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: '10px',
      }}
    >
      <IconButton color="primary" onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </Box>
  </>
);

export default GroupReqsHeader;
