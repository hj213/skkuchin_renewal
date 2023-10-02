import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CustomDropdownMenu = ({ anchorEl, open, onClose, options }) => {
  return (
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        autoFocus={false}
        PaperProps={{ elevation: 1 }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} onClick={option.onClick} 
            sx={{
                fontWeight: 800, 
                fontSize: '12px', 
                minHeight: 'unset', 
                lineHeight: 1.4,
                color: option.label === '신고하기' || option.label === '삭제하기' ? '#FF3B3B' : '#3C3C3C',
                borderBottom: index < options.length - 1 ? '1px solid #E2E2E2' : 'none', 
                justifyContent: 'center',
                margin: '0px 10px',
                paddingX: '18px'
            }}
        >
            {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomDropdownMenu;
