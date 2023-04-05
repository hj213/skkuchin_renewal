import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';
import theme from '../theme/theme';
import { useState } from 'react';
import {Container} from '@mui/material';
import mainLogo from '../image/upperBar/mainLogo.png'
import messageIcon from '../image/upperBar/message_X.png'
import notiIcon from '../image/upperBar/notification_X.png'
import messageOnIcon from '../image/upperBar/message.png'
import notiOnIcon from '../image/upperBar/notification.png'
import Image from 'next/image'
import { useEffect } from "react";
import { useSelector } from 'react-redux';

const UpperBar = () => {
    const [selected, setSelected] = useState("스꾸맵");
    const chatAlarm = useSelector(state => state.chatAlarm.chatAlarm);
    const noticeAlarm = useSelector(state => state.noticeAlarm.noticeAlarm);
    const user = useSelector(state => state.auth.user);

    // 0226 myPage 적용 안되는 문제 수정 완료
    useEffect(() => {
        const currentPathname = window.location.pathname;
        if (currentPathname === "/match") {
            setSelected("AI 매칭");
        } else if (currentPathname === "/magazine" || currentPathname === "/magazineDetail" ){
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
        <div style={{ zIndex:'99', position: "fixed", top: 0, width: "100%", background: "white", alignContent:"center", paddingBottom:'9px',borderBottom: '1.5px solid rgba(234, 234, 234, 1)', maxWidth:'420px'}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding:"15px 15px 0px 15px"}}>
                <Link href="/">
                    <Image src={mainLogo} width={85} height={19} />
                </Link>
            <div style={{flex: 1}} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{marginRight:"18px"}}>
                        <Link href="/message">
                            <Image src={chatAlarm ? messageOnIcon : messageIcon} width={24} height={24}/>
                        </Link>
                    </div>
                    <div>
                        <Link href="/notification">
                            <Image src={noticeAlarm ? notiOnIcon : notiIcon} width={24} height={24}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth:"420px", padding:"15px 15px 0px 15px"}}>
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
                    매거진
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
            {
                user ?
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
                :
                <Link href="/login">
                    <a
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#505050",
                            textDecoration: "none",
                            borderBottom: "none"
                        }}
                    >
                    <span style={{padding:"0 0 2px 0"}}>
                        로그인
                    </span>
                    </a>
                </Link>
            }
        </div>
    </div>
            </Container>
        </ThemeProvider>
)};

export default UpperBar;