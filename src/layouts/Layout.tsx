import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
const { Content } = Layout;

export default function Layouts() {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px 30px 50px', background: '#fff', minHeight: 'calc(100vh - 30px)' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}
