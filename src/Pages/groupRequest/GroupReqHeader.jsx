// GroupReqsHeader.jsx

import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const GroupReqsHeader = ({ handleApprove, handleDecline, handleRefresh }) => (
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

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <IconButton color="primary" onClick={handleDecline}>
          <CloseIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleApprove}>
          <CheckIcon />
        </IconButton>
      </Box>
    </Box>
  </>
);

export default GroupReqsHeader;
