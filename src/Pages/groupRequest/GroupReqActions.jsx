import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const GroupReqActions = ({ onApprove, onDeny }) => (
  <Box>
    <Tooltip title="Approve" placement="top">
      <IconButton color="success" onClick={onApprove}>
        <CheckIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Deny" placement="top">
      <IconButton color="error" onClick={onDeny}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  </Box>
);

export default GroupReqActions;
