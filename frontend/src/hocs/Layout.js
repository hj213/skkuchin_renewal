import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../actions/auth/auth";
import Head from "next/head";
import SockJS from "sockjs-client";

const Layout = ({title, content, children}) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(load_user());

            
        }
    }, []);


    return ( 
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={content} ></meta>
                </Head>
                
                <div>
                    {children}
                </div>
            </>
        )
};

Layout.defaultProps = {
    title: '스꾸친',
    content: '스꾸친은 성균관대학교 학생들 간의 밥 약속을 성사시켜드립니다!'
}

export default Layout;