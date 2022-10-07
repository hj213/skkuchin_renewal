import Layout from "../hocs/Layout";

const homePage = () => (
  <Layout
    title='스꾸친 home'
    content = '스꾸친의 메인 페이지입니다.'
  >
    <div className="p-5 bg-light rounded-3">
      <div className="container-fluid py-3">
        <h1>Home Page</h1>
        <p className="fs-4 mt-3">
          Welcome to the httpOnly auth Tutorial Site!
        </p>
      </div>
    </div>
  </Layout>
);

export default homePage;