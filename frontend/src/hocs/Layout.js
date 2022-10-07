import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { request_refresh } from "../actions/auth";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Layout = ({title, content, children}) => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(request_refresh());
    }, [dispatch]);

    return ( 
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} ></meta>
            </Head>
            <Navbar/>
            <div className="container mt-5">
                {children}
            </div>
        </>
        )
};

Layout.defaultProps = {
    title: '스꾸친',
    content: 'hos의 layout.js의 페이지입니다.'
}

export default Layout;