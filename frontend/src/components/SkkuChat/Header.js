import React from 'react';
import { Grid, Typography, Card } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import searchIcon from '../../image/search.png';
import dotIcon from '../../image/dotIcon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = ({ title, onBackClick, showSearchIcon }) => {
  const router = useRouter();

  return (
    <Card style={{
      height: 'max-content',
      zIndex: '4',
      borderRadius: 0,
      boxShadow: 'none',
    }}>
      <Grid container style={{justifyContent: 'space-between', alignItems: 'center', }}>
        <Grid onClick={onBackClick}>
          <Image src={back} width={11} height={18} name='back' layout='fixed' />
        </Grid>
        <Grid>
          <Typography sx={{fontSize: '18px', fontWeight: 700, color: '#3C3C3C'}}>{title}</Typography>
        </Grid>
        <Grid>
            {showSearchIcon ? (
                <Image src={searchIcon} width={24} height={24} name='search' layout='fixed' onClick={() => router.push('/communitySearch')}/>
            ) : (
                <Image src={dotIcon} width={36} height={36} name='menu' layout='fixed' />
            )}
        </Grid>
      </Grid>
    </Card>
  );
};

Header.defaultProps = {
    showSearchIcon: false, 
};

export default Header;
