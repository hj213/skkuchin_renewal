import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete} from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { check_nickname, register } from "../../actions/auth/auth";
import { useDispatch } from 'react-redux';

const SignUpStep2 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [validNickname, setValidNickname] = useState(null);
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [studentId, setStudentId] = useState("");
    const [majorValue, setMajorValue] = useState("");

    const majorList = [
      '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공', '소비자학과',
      '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
      '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
      '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
      '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
      '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
      '사회복지학과', '사회학과', '심리학과',
      '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
      '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
      '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
      '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
      '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
    ];
    const studentIdList = [
      '23학번', '22학번', '21학번', '20학번', '19학번', '18학번', '17학번', '16학번', '15학번', '14학번', '13학번', '12학번', '11학번', '10학번'
    ]

    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const handleNextStep = () => {
      //dispatch(register(props.data))
      //props.setData({...props.data, major: majorValue});
      props.handleNextStep();
    }

    const handleNicknameChange = (e) => {
      if (validNickname != null) {
        setValidNickname(null);
      }
      props.setData({...props.data, nickname: e.target.value})
    }

    const checkNickname = () => {
      dispatch(check_nickname(props.data.nickname, ([result, message]) => {
          setValidNickname(result);
          setNicknameMsg(message);
      }))
  }


    return (
      <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography>
                            </Grid>
                        </Grid>
        </Container>
      <Box
        sx={{
        margin: '55px 15px 15px 15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>회원가입</Typography>
      </header> */}
      <form style={{ width: '100%'}}>
        <div style={{margin: '0 36px'}}>
        <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>닉네임*</Typography>
          <TextField
            variant="standard"
            //label="닉네임"
            value={props.data.nickname}
            onChange={handleNicknameChange}
            style={{width: '100%'}}
            //InputLabelProps={{
              //shrink: true,
            //}}
            required
            InputProps={{
              endAdornment: (validNickname) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
          }}
            />
            {/* 중복확인 메소드 추가 */}
            <div style={{display:'flex'}}>
              <Button variant="contained" onClick={checkNickname} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '15px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', margin: '4px 0px 39px', boxShadow: 'none'}}>중복확인</Button>
              {validNickname == null && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', margin: '7px 0 39px 5px'}}>닉네임 중복 확인 체크를 해주세요</Typography>}
              {validNickname && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', margin: '7px 0 39px 5px'}}>{nicknameMsg}</Typography>}
              {validNickname == false && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', margin: '7px 0 39px 5px'}}>{nicknameMsg}</Typography>}
            </div>
        </div>
        <div style={{margin: '0 36px 44px'}}>
          <FormControl variant="standard" style={{width: '100%'}}>
            {/* <InputLabel shrink required >학부/학과</InputLabel>
            <Select
                MenuProps={{
                  style: {
                      width: '212px',
                      height: '241px',
                  }
              }}
              name='major'
              //value={major}
              //onChange={(e) => setMajor(e.target.value)}
              value={props.data.major}
              onChange={(e) => props.setData({...props.data, major: e.target.value})}
            >
                {majorList.map((item, index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
            </Select> */}
            <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>학부/학과*</Typography>
            <Autocomplete
              clearOnEscape
              value={props.data.major}
              onChange={(e, value) => props.setData({...props.data, major: value})}
              options={majorList.sort()}
              renderInput={(params) => <TextField {...params} variant="standard" style={{fontSize: '12px'}} />} 
            />
          </FormControl>
        </div>
        <div style={{margin: '0 36px 65px'}}>
          <FormControl variant="standard" style={{width: '100%'}}>
              {/* <InputLabel shrink required >학번</InputLabel>
              <Select
                  MenuProps={{
                    style: {
                        width: '212px',
                        height: '241px',
                        fontWeight: '700'
                    }
                }}
                name='student_id'
                value={studentId}
                onChange={(e) => {props.setData({...props.data, student_id: e.target.value.slice(0, 2)}); setStudentId(e.target.value)}}
              >
                  {studentIdList.map((item, index) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                  ))}
              </Select> */}
              <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>학번*</Typography>
              <Autocomplete
                clearOnEscape
                value={props.data.studentId}
                onChange={(e, value) => props.setData({...props.data, student_id: value.slice(0, 2)})}
                options={studentIdList}
                renderInput={(params) => <TextField {...params} variant="standard" style={{fontSize: '12px'}} />} 
              />
            </FormControl>
        </div>
        <div style={{margin: '0 36px 12px'}}>
            {validNickname && (props.data.nickname != '' && majorList.indexOf(props.data.major) != -1 && props.data.student_id.length == 2 && props.data.student_id < 24) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
                    </Button>
                    :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
                    </Button>
            }
        </div>
        </form>
        <div style={{display: 'flex', fontSize: '12px', fontWeight: '500', padding: '6px 0', color: '#505050'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?</span><Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700'}}>로그인</Button>
        </div>
      </Box>
      </div>
    );
  };

  export default SignUpStep2;