import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../hocs/Layout";

const Dashboard = () => {
    const router = useRouter();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    return(
        <Layout
            title='스꾸친 | Dashboard'
            content='스꾸친 dashboard입니다.'
        >
            <div className="p-5 bg-light rounded-3">
                <div className="container-fluid py-3">
                    <h1 className="display-5 fw-bold">My Dashboard</h1>
                    <p className="fs-4 mt-3">welcome {user !== null && user.nickname} to 스꾸친!</p>
                </div>

            </div>
        </Layout>
    )
};

export default Dashboard;