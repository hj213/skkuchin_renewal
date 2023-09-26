import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const CustomPopupNoBtn = ({ open, onClose, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '10px',
          boxShadow: 'none',
          maxWidth: '100vw',
          maxHeight: '100vh',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(50, 50, 50, 0.25)',
          maxWidth: '100vw',
          maxHeight: '100vh',
        },
      }}
    >
        <DialogContent>
            <DialogTitle sx={{ color: '#3C3C3C', fontSize: '16px', fontWeight: 800,  m: '0' }}>
            {content}
            </DialogTitle>
        </DialogContent>
    </Dialog>
  );
};

export default CustomPopupNoBtn;
