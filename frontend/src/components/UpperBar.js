import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import theme from '../theme/theme';
import { useState } from 'react';
import {Container} from '@mui/material';
import mainLogo from '../image/upperBar/mainLogo.png'
import messageIcon from '../image/upperBar/message.png'
import notiIcon from '../image/upperBar/notification.png'
import Image from 'next/image'
import { useEffect } from "react";

const UpperBar = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [selected, setSelected] = useState("스꾸맵");

    // 0218 upperBar 에러 수정
    useEffect(() => {
        const currentPathname = window.location.pathname;
        if (currentPathname === "/match") {
          setSelected("AI 매칭");
        } else if (currentPathname === "/magazine"){
          setSelected("매거진");
        } else if (currentPathname === "/mypage"){
            setSelected("마이페이지");
        } else {
            setSelected("스꾸맵");
        }
      }, []);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const authLinks = (
        // 상단 네비게이션 바. maxWidth는 지도와 맞춤
        <div style={{ position: "fixed", top: 0, width: "100%", background: "white", alignContent:"center"}}>
        {/* // 스크롤 X */}
        {/* // <div style={{ position: "absolute", top: 0, width: "100%", background: "white", alignContent:"center"}}> */}

            {/* 상단 아이콘 위치, 추후 페이지 제작 시 link 연결 필요 */}
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth:"600px", padding:"15px 15px 0px 15px"}}>
                <Link href="/">
                    <Image src={mainLogo} width={85} height={19} />
                </Link>
            <div style={{flex: 1}} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{marginRight:"10px"}}>
                        <Image src={messageIcon} width={24} height={24}/>
                    </div>
                    <div>
                        <Image src={notiIcon} width={24} height={24}/>
                    </div>
                </div>
            </div>
            {/* 상단 네비게이션 바, link text decoration으로는 하단 밑줄 여백을 조절할 수 없어서
                border bottom을 만든 뒤 span으로 감싸진 텍스트와 padding으로 여백 줌 */}
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth:"600px", padding:"15px 15px 0px 15px"}}>
            <Link href="/">
                <a
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textDecoration: "none",
                        color: selected === "스꾸맵" ? "#FFCE00" : "#505050",
                        borderBottom: selected === "스꾸맵" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("스꾸맵")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    스꾸맵
                </span>
                </a>
            </Link>
            <Link href="/magazine">
                <a
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: selected === "매거진" ? "#FFCE00" : "#505050",
                        textDecoration: "none",
                        borderBottom: selected === "매거진" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("매거진")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    메거진
                </span>
                </a>
            </Link>
            <Link href="/match">
                <a
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: selected === "AI 매칭" ? "#FFCE00" : "#505050",
                        textDecoration: "none",
                        borderBottom: selected === "AI 매칭" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("AI 매칭")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    AI 매칭
                </span>
                </a>
            </Link>
            <Link href="/myPage">
                <a
                style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: selected === "마이페이지" ? "#FFCE00" : "#505050",
                    textDecoration: "none",
                    borderBottom: selected === "마이페이지" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("마이페이지")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    마이페이지
                </span>
                </a>
            </Link>
        </div>
    </div>
    );

    // index.js에서도 isAuthenticated로 한번 걸러내긴 하지만
    // 혹시 추후에 비회원 유저도 맵을 일부 이용하게 할 경우
    // 마이페이지 -> 회원가입 등으로 수정하기 위해 남겨둠. (guestLinks)
    const guestLinks = (
        <>
            <li className='nav-item'>
                <Link href='/register'>
                    <a className={router.pathname === '/register' ? 'nav-link active' : 'nav-link'}>
                        Register
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/login'>
                    <a className={router.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
                        Login
                    </a>
                </Link>
            </li>
        </>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container disableGutters={true} maxWidth="xs" style={{height:"90px", margin:"0", padding:"0"}} overflow="hidden">
                    {
                        isAuthenticated ? authLinks: guestLinks
                    }
            </Container>
        </ThemeProvider>
)};

export default UpperBar;