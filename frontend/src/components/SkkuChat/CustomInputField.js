import React, { useState } from 'react';
import { TextField, Grid, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import send from '../../image/send.png';
import Image from 'next/image';

const CustomInputField = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendClick = () => {
        setMessage('');
    };

    return (
        <div style={{ width: `calc(100%-48px)`, height: '44px', justifyContent: 'space-between', display: 'flex', backgroundColor: '#F2F2F2', borderRadius: '10px', alignItems: 'center'}}>
            <Button
                onClick={handleCheck}
                sx={{
                    fontSize: '12px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9E9E9E',
                    pl: '10px',
                }}
                >
                {isChecked ? (
                    <CheckCircleIcon sx={{ mr: '3px', color: '#9E9E9E', width: '16px' }} />
                ) : (
                    <CheckCircleOutlineIcon sx={{ mr: '3px', color: '#9E9E9E', width: '16px'}} />
                )}
                익명
            </Button>
            <TextField
                value={message}
                onChange={handleMessageChange}
                variant="outlined"
                InputProps={{
                    placeholder: "댓글을 입력하세요.",
                    style: {
                        fontSize: '14px',
                    },
                }}
                sx={{
                    flexGrow: 1,
                    '& fieldset': {
                        border: 'none', 
                    },
                    color: '#9E9E9E',
                }}
            />
            <Button onClick={handleSendClick}>
                <Image src={send} width={17.43}  />
            </Button>
        </div>
    );
};

export default CustomInputField;