import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Select, MenuItem} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import uncheck from '../../image/uncheck.png';
import logo from '../../image/email_enhang.png'
import Image from 'next/image';
import { register } from "../../actions/auth/auth";
import { signup_email_send } from '../../actions/email/email';

const SignUpStep3 = (props) => {
    const dispatch = useDispatch();
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('@g.skku.edu');

    const [checkState, setCheckState] = useState(false);
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    const handleSubmit= (e) => {
      e.preventDefault();

      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(signup_email_send(props.data.username, emailId+domain, true, ([result, message]) => {
          if (result) {
            props.setData({...props.data, email: emailId+domain});
            props.handleNextStep();
          } else {
            alert(message);
          }
        }));
      }

      console.log(props.data);
    }

    const handleCheck = () => {
      setCheckState(!checkState);
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
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>성균관대학교 인증</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '55px', lineHeight: '25px', color: '#505050'}}>스꾸친(SKKU_CHIN)은 <br/>
                        <u>성균관대학교 기반 매칭 서비스</u>를 제공합니다 <br/>
                        원활한 서비스 이용을 위해 <br/>
                        이메일 인증을 완료해주세요</Typography>
        </div>

        <form onSubmit={handleSubmit}>
        <div style={{textAlign: 'center', display: 'flex', marginBottom: '10.75px'}}>
          <TextField
            variant="standard"
            placeholder="킹고 이메일 주소"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            InputProps={{
              style: {
                fontSize: '12px',
                padding: '4px 24px 5px 0',
                height: '32px'
              }
            }}
            
          />
          <Select
              variant="standard"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              InputProps={{
                style: {
                  fontSize: '12px',
                }
              }}
          >
            <MenuItem value="@g.skku.edu">@g.skku.edu</MenuItem>
            <MenuItem value="@skku.edu">@skku.edu</MenuItem>
          </Select>
        </div>
        <div style={{display:'flex', height: '28px', alignItems: 'center', marginBottom: '37px'}}>
            {
              checkState ?
                <Image src={check} onClick={handleCheck} width={15.83} height={15.83}/>
              :  
                <Image src={uncheck} onClick={handleCheck} width={15.83} height={15.83}/>
            }
          <Typography sx={{fontSize: '10px', fontWeight: '400', ml: '5.58px'}}>개인정보처리방침 및 이용약관에 동의합니다</Typography>
        </div>
        {/* { validPW && (password == re_password) && username != null ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
                    </Button>
            } */}
          {emailId != '' && checkState ?
              <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                  이메일 인증하기
              </Button>
          :
              <Button variant="contained"  disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                  이메일 인증하기
              </Button>
          }

        </form>
      </Box>
    );
  };

  export default SignUpStep3;