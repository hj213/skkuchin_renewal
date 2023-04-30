import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {

    return (
        <Html lang="ko">
            <Head>
                <meta charSet="utf-8" />
                <meta name="robots" content="index,follow" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="naver-site-verification" content="a1c9f9dfec618ddcfc1e360479b0de95fb63259a" />
                <meta name="google-site-verification" content="V5bATJqLVOMYAYwRGWSUtUk9_n5kOhR9kqd3VS-S8-I" />
                <meta name="description" content="성대 네트워킹의 모든 것, 스꾸친" />
                <meta name="keywords" content="스꾸친, 맛집, 채팅, 대화, 명륜, 율전" />
                <link rel="canonical" href="https://www.skkuchin.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="스꾸친" />
                <meta property="og:site_name" content="스꾸친" />
                <meta property="og:description" content="성대 네트워킹의 모든 것, 스꾸친" />
                <meta property="og:image" content="/icons/maskable_icon.png" />
                <meta property="og:url" content="https://www.skkuchin.com" />
                {/* favicon */}
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}

export default Document;