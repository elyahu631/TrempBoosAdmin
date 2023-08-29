import React from 'react';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const InfoButton = ({ onClick }) => (
  <IconButton color="primary" onClick={onClick}>
    <MoreHorizIcon />
  </IconButton>
);

export default InfoButton;
