import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { register} from "../actions/auth/auth";
import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";
import SignUpStep1 from '../components/Auth/SignUpStep1';
import SignUpStep2 from '../components/Auth/SignUpStep2';
import SignUpStep3 from '../components/Auth/SignUpStep3';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const register_success = useSelector(state => state.auth.register_success);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);

    const [formData, setFormData] = useState({
        nickname: '',
        username: '',
        password: '',
        re_password: '',
        email: '',
        student_id: '',
        major: '',

    });

    
    const [step, setStep] = useState(1);

    const handleNextStep = (stepData) => {
        setFormData({...formData, ...stepData});
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }
    
    const onSubmit = e => {
        e.preventDefault();
        if (dispatch && dispatch !== null && dispatch !== undefined)
          dispatch(register(formData));
    };


    if(typeof window !== 'undefined' && isAuthenticated)
        router.push('/dashboard');
    if(register_success)
        router.push('/login');
    
        
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout title= '스꾸친 | Register' content='Register page'>
            <Container component="main" maxWidth="xs">
            {
                step === 1 && <SignUpStep1 formData={formData} handleNextStep={handleNextStep} />
            }
            {
                step === 2 && <SignUpStep2 formData={formData} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
            }
            {
                step === 3 && <SignUpStep3 formData={formData} handlePrevStep={handlePrevStep} handleSubmit={onSubmit} />
            }
            </Container>
        </Layout>
        </ThemeProvider>
    )
};

export default RegisterPage;
// import { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { register} from "../actions/auth/auth";
// import Layout from "../hocs/Layout";
// import Loader from "react-loader-spinner";

// const RegisterPage = () => {

//     const dispatch = useDispatch();
//     const router = useRouter();
//     const register_success = useSelector(state => state.auth.register_success);
//     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//     const loading = useSelector(state => state.auth.loading);
//     const majorList = [
//         '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공',
//         '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
//         '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
//         '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
//         '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
//         '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
//         '사회복지학과', '사회학과', '사회학과', '심리학과',
//         '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
//         '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
//         '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
//         '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과'
//     ];
//     const mbtiList = [
//         'ENFJ', 'ESFJ', 'ENTJ', 'ESTJ', 'ENFP', 'ESFP', 'ENTP', 'ESTP',
//         'INFJ', 'ISFJ', 'INTJ', 'ISTJ', 'INFP', 'ISFP', 'INTP', 'ISTP', 
//     ];

//     const [formData, setFormData] = useState({
//         nickname: '',
//         username: '',
//         password: '',
//         re_password: '',
//         email: '',
//         student_id: '',
//         major: '',
//         mbti: '',
//         image: '아무거나 입력'

//     });

//     const {
//         nickname,
//         username,
//         password,
//         re_password,
//         email,
//         student_id,
//         major,
//         mbti,
//         image
//     } = formData;

//     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

//     const onSubmit = e => {
//         e.preventDefault();

//         if(dispatch && dispatch !== null && dispatch !== undefined){
//             dispatch(register(nickname, username, password, re_password, email, student_id, major, mbti, image));
//         };
//     };

//     if(typeof window !== 'undefined' && isAuthenticated)
//         router.push('/dashboard');
//     if(register_success)
//         router.push('/login');
    
//     return(
    
//         <Layout title= '스꾸친 | Register' content='Register page'>
//             <h1 className='display-4'>Resiter Page</h1>
//             <form className='bg-light p-5 mt-5 mb-5' onSubmit={onSubmit}>
//                 <h3>Create An Account</h3>
//                 {/* 닉네임 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='first_name'>
//                         <strong>Nickname*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'text' name='nickname' 
//                         placeholder ='Nickname' onChange={onChange} value={nickname}
//                         required />
//                 </div>
//                 {/* 아이디 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='username'>
//                         <strong>Username*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'text' name='username' 
//                         placeholder ='Username' onChange={onChange} value={username}
//                         required />
//                 </div>
//                 {/* 비밀번호 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='password'>
//                         <strong>Password*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'password' name='password' 
//                         placeholder ='Password' onChange={onChange} value={password}
//                         minLength='8'
//                         required />
//                 </div>
//                 {/* 비밀번호 확인 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='re_password'>
//                         <strong>Confirm Password*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'password' name='re_password' 
//                         placeholder ='Confirm Password' onChange={onChange} value={re_password}
//                         minLength='8'
//                         required />
//                 </div>
//                 {/* 이메일 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='email'>
//                         <strong>Email*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'email' name='email' 
//                         placeholder ='Email' onChange={onChange} value={email}
//                         required />
//                 </div>
//                 {/* 학번 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='student_id'>
//                         <strong>Student ID*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'text' name='student_id' 
//                         placeholder ='Student ID' onChange={onChange} value={student_id}
//                         required />
//                 </div>
//                 {/* 전공 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='major'>
//                         <strong>Major*</strong>
//                     </label>
//                     <select name='major' onChange={onChange} required>
//                         {majorList.map((item) => (
//                             <option value={item}>
//                                 {item}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {/* MBTI */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='mbti'>
//                         <strong>MBTI</strong>
//                     </label>
//                     <select name='mbti' onChange={onChange}>
//                         {mbtiList.map((item) => (
//                             <option value={item}>
//                                 {item}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {/* 이미지 */}
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='image'>
//                         <strong>Image*</strong>
//                     </label>
//                     <input 
//                         className='form-control' type = 'text' name='image' 
//                         placeholder ='아무거나 입력' onChange={onChange} value={image}
//                         required />
//                 </div>
//                 {
//                     loading ? (
//                         <div className="d-flex justify-content-center align-items-center mt-5">
//                             <Loader type = 'Oval' color = '#00bfff' width={50} height={50} />
//                         </div>
//                     ) : (
//                         <button className='btn btn-primary mt-5' type='submit'>
//                             Create Account
//                         </button>
//                     )
//                 }
            
//             </form>
//         </Layout>
//     )
// };

// export default RegisterPage;
