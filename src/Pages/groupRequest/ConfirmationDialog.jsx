import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, groupName }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Group Request</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to confirm the group "{groupName}"?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
