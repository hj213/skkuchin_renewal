import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Select, MenuItem} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import uncheck from '../../image/uncheck.png';
import logo from '../../image/email_enhang.png'
import Image from 'next/image';
import { register } from "../../actions/auth/auth";
import { signup_email_check } from '../../actions/email/email';

const SignUpStep4 = (props) => {
    const dispatch = useDispatch();
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('@g.skku.edu');
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    const handleSubmit= (e) => {
      e.preventDefault();

      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(signup_email_check(props.data.username, ([result, message]) => {
          if (result) {
            alert(message);
          } else {
            alert(message);
          }
        }));
        //useSelector로 불러온 이메일 인증 완료 여부가 true라면? nextStep 호출.
      }
    }
      
    return (
      <Box
            sx={{
            marginTop: '45px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '61px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>이메일 인증</Typography>
        </header>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={101} src={logo}/>
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '31px', lineHeight: '25px', color: '#505050'}}>
                성균관대학교 인증 메일이 발송되었습니다. <br/>
                        발송된 메일을 통해 인증 완료 후 <br/>
                        아래 확인 버튼을 눌러주세요
            </Typography>
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '97px', lineHeight: '25px', color: '#505050'}}>
                        모바일인 경우 <br/>
                        [킹고M 어플&gt;메뉴&gt;킹고포털&gt;메일]에서 확인 가능합니다
            </Typography>
        </div>

        <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
            확인
        </Button>

      </Box>
    );
  };

  export default SignUpStep4;