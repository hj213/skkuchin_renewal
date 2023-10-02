import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const CustomPopup = ({ open, onClose, content, rightButtonLabel, leftButtonLabel, onRightButtonClick, onLeftButtonClick }) => {
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
        <DialogContent sx={{p: '16px 16px 0'}}>
            <DialogTitle sx={{ color: '#3C3C3C', fontSize: '16px', fontWeight: 800, p: '30px 50px', m: '0' }}>
            {content}
            </DialogTitle>
        </DialogContent>
        <DialogActions sx={{ p: '0 16px 16px',  justifyContent: 'space-between'}}>
            <Button
                sx={{ width: '45%', p: '13px 0', m: 'auto', color: '#BABABA', backgroundColor: '#F2F2F2', borderRadius: '10px' }}
                onClick={onLeftButtonClick}
            >
                {leftButtonLabel}
            </Button>
            <Button
                sx={{ width: '45%', p: '13px 0', m: 'auto', color: '#fff', backgroundColor: '#FFCE00', borderRadius: '10px' }}
                onClick={onRightButtonClick}
            >
                {rightButtonLabel}
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default CustomPopup;
