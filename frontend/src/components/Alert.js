import { CssBaseline, ThemeProvider, Alert } from '@mui/material';
import theme from '../theme/theme';
import { useState, useEffect } from 'react';

export default function AlertMessage({ alertOpen, alertMessage }){
    const [open, setOpen] = useState(alertOpen);
    
    useEffect(() => {
        setOpen(alertOpen);
      }, [alertOpen]);

    useEffect(() => {
        if(alertOpen){
        const timer = setTimeout(() => {
          setOpen(false);
        }, 3000);
    
        return () => clearTimeout(timer);
        }
      }, [alertOpen]);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ position: 'relative', zIndex:'6' }}>
            {open && (
                <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '200px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '6',
                  textAlign:'center'
                }}
              >
                <Alert style={{width: `${alertMessage.length * 11}px`, color:'black', backgroundColor:'white', borderRadius:'10px', boxShadow: '0px 3px 5px rgba(0,0,0,0.3)' }} icon={false}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <div style={{textAlign: 'center', padding:'5px'}}>{alertMessage}</div>
                    </div> 
                </Alert>
              </div>
            )}
            </div>
            
        </ThemeProvider>
    )
}