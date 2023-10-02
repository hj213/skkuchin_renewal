import React from 'react';
import { Grid, Typography, Card, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import close from '../../image/close.png';
import Image from 'next/image';

const UploadHeader = ({ onBackClick, onCompleteClick, isValidForm, isReport }) => {
  
  return (
    <Card
      style={{
        height: 'max-content',
        zIndex: '4',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <Grid container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid onClick={onBackClick} sx={{mr: '8px'}}>
          <Image src={close} width={24} height={24} name='close' layout='fixed' />
        </Grid>
        <Grid>
          <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#3C3C3C' }}>{isReport ? '신고하기' : '글쓰기'}</Typography>
        </Grid>
        <Grid>
          <IconButton onClick={onCompleteClick} sx={{p: 0}} disabled={!isValidForm}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700, color: isValidForm ? '#FFCE00' : '#BABABA', p: 0 }}>완료</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UploadHeader;
