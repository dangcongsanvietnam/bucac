import React, { useState } from 'react';
import { Button, Col, Dropdown, Layout, Menu, Row } from 'antd';
import { AppstoreOutlined, BookOutlined, InsertRowLeftOutlined, StarOutlined, UsergroupAddOutlined, UserOutlined, ZoomInOutlined } from '@ant-design/icons';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { title: 'Tài khoản', path: '/dashboard/account', icon: <UserOutlined /> },
  { title: 'Khoa', path: '/dashboard/department', icon: <AppstoreOutlined /> },
  { title: 'Lớp', path: '/dashboard/class', icon: <InsertRowLeftOutlined /> },
  { title: 'Sinh viên', path: '/dashboard/student', icon: <UsergroupAddOutlined /> },
  { title: 'Học phần', path: '/dashboard/subject', icon: <BookOutlined /> },
  { title: 'Điểm', path: '/dashboard/score', icon: <StarOutlined /> },
  { title: 'Điểm danh', path: '/dashboard/attendence', icon: <ZoomInOutlined /> },
];

const Dashboard = ({children}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ backgroundColor: '#fff' }} collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className='flex justify-center items-center mt-5'>
          <Button className="menu-toggle-btn" onClick={toggleCollapsed}>
            <MenuOutlined />
          </Button>
          <h1 className="text-xl font-bold ml-5">Class</h1>
        </div>
        <Menu
          className='mt-12 items-start justify-start'
          onClick={({ key }) => handleNavigate(key)}
          theme='light'
          mode='inline'
          inlineCollapsed={collapsed}
        >
          {items.map(item => (
            <Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Row gutter={32} justify='space-between' align='middle'>
            <Col span={10}></Col>
            <Col span={5} offset={9}>
              <div className='flex items-center gap-4 justify-end p-6'>
                <Dropdown className='cursor-pointer'>
                  <div className='h-full text-2xl flex items-center justify-center'>
                    <img className='block mx-auto max-w-[32px] max-h-[32px] rounded-[50px]' alt='userIcon' src={"/profile.png"} />
                  </div>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '32px 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Created by Ronaldo</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
