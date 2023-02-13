import Head from 'next/head'

const Fallback = () => (
    <>
        <Head>
        <title>스꾸친 오프라인 모드</title>
        </Head>
        <h1>현재 오프라인 상태입니다</h1>
        <h2>인터넷 연결을 확인해주시기 바랍니다</h2>
    </>
)

export default Fallback;