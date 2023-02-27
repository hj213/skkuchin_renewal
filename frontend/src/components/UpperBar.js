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

    // 0226 myPage 적용 안되는 문제 수정 완료
    useEffect(() => {
        const currentPathname = window.location.pathname;
        if (currentPathname === "/match") {
          setSelected("AI 매칭");
        } else if (currentPathname === "/magazine"){
          setSelected("매거진");
        } else if (currentPathname === "/myPage"){
            setSelected("마이페이지");
        } else {
            setSelected("스꾸맵");
        }
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container disableGutters={true} maxWidth="xs" style={{height:"90px", margin:"0", padding:"0"}} overflow="hidden">
        <div style={{ zIndex:'99', position: "fixed", top: 0, width: "100%", background: "white", alignContent:"center", paddingBottom:'9px',borderBottom: '1.5px solid rgba(234, 234, 234, 1)', maxWidth:'600px'}}>
        {/* // 스크롤 X */}
        {/* // <div style={{ position: "absolute", top: 0, width: "100%", background: "white", alignContent:"center"}}> */}

            {/* 0226 상단바 isAuth 삭제 안료 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth:"600px", padding:"15px 15px 0px 15px"}}>
                <Link href="/">
                    <Image src={mainLogo} width={85} height={19} />
                </Link>
            <div style={{flex: 1}} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{marginRight:"10px"}}>
                        {/* message.js로 연결. 추후 채팅 API연결 시 조건문으로 이미지 변경 */}
                        <Link href="/message">
                            <Image src={messageIcon} width={24} height={24}/>
                        </Link>
                    </div>
                    <div>
                        {/* 추후 채팅 API연결 시 조건문으로 이미지 변경 */}
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
                        borderBottom: selected === "스꾸맵" ? "2px solid #FFCE00" : "none",
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
            </Container>
        </ThemeProvider>
)};

export default UpperBar;