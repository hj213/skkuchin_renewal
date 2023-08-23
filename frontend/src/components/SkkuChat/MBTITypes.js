import React from 'react';
import { Box } from '@mui/material';

const MBTITypes = ({ types, matchingUser }) => {
    return (
        <>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridColumnGap: '12px', textAlign: 'center'}}>
                {types.map((type, index) => (
                    <Box
                        key={type}
                        sx={{
                            backgroundColor: matchingUser.mbti.includes(type) ? '#FFFCE4' : '#fff',
                            border: '1px solid #E2E2E2',
                            borderTopLeftRadius: index < 4 ? '8px' : '0',
                            borderTopRightRadius: index < 4 ? '8px' : '0',
                            borderBottomLeftRadius: index >= 4 ? '8px' : '0',
                            borderBottomRightRadius: index >= 4 ? '8px' : '0',
                            borderTop: index < 4 ? '1px solid #E2E2E2' : 'none',
                            p: '8px 0',
                        }}
                        variant="contained"
                    >
                        {type}
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default MBTITypes;
