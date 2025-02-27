import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  BookOutlined,
  FileDoneOutlined,
  EyeOutlined,
  CommentOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    if (key === 'signin') {
      navigate('/');
    }
    console.log(`Menu item clicked: ${key}`);
  };

  const renderMenuItems = () => {
    if (userRole === 'sub-admin') {
      return (
        <>
          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">HOME</div>
          <Menu.Item key="/home" icon={<DashboardOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/courses" icon={<BookOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="/test" icon={<FileDoneOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/test">Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="/course-access-overview" icon={<EyeOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/course-access-overview">Course Overview</Link>
          </Menu.Item>

          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">COMMENTS</div>
          <Menu.Item key="/comment-overview" icon={<CommentOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/comment-overview">Comments Overview</Link>
          </Menu.Item>

          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">ACCOUNT</div>
          <Menu.Item key="/profile" icon={<UserOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/signin" icon={<LogoutOutlined />} className="rounded-lg hover:bg-blue-100" onClick={() => handleMenuClick('signin')}>
            Logout
          </Menu.Item>
        </>
      );
    } else if (userRole === 'super-admin') {
      return (
        <>
          <div className="px-4 pt-5 text-gray-500 text-xs font-semibold">HOME</div>
          <Menu.Item key="/home" icon={<DashboardOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/users_management" icon={<TeamOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/users_management">User Management</Link>
          </Menu.Item>
          <Menu.Item key="/courses_management" icon={<BookOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/courses_management">Courses Management</Link>
          </Menu.Item>
          <Menu.Item key="/quizes_management" icon={<FileDoneOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/quizes_management">Quizzes Management</Link>
          </Menu.Item>

          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">MENTOR</div>
          <Menu.Item key="/mentor_management" icon={<UsergroupAddOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/mentor_management">Mentor Management</Link>
          </Menu.Item>

          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">REPORTS & ANALYTICS</div>
          <Menu.Item key="/reports" icon={<BarChartOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/reports">Reports</Link>
          </Menu.Item>

          <div className="px-4 pt-6 text-gray-500 text-xs font-semibold">ACCOUNT</div>
          <Menu.Item key="/profile" icon={<UserOutlined />} className="rounded-lg hover:bg-blue-100">
            <Link to="/Super_profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/signin" icon={<LogoutOutlined />} className="rounded-lg hover:bg-blue-100" onClick={() => handleMenuClick('signin')}>
            Logout
          </Menu.Item>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Sider width={270} className="h-screen bg-white shadow-lg" style={{ overflow: 'auto', position: 'fixed', left: 0, top: 0, bottom: 0, borderRight: '1px solid #E5E7EB' }}>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="flex items-center">
          <AppstoreOutlined className="text-2xl mr-2 text-blue-400" />
          <Title level={4} className="!m-0" style={{ color: "#1890ff" }}>
            AMATEGEKO PANEL
          </Title>
        </div>
        <p className="mt-1 text-gray-400">{userRole === 'super-admin' ? 'Super Admin Panel' : 'Sub Admin Panel'}</p>
      </div>

      <Menu mode="inline" selectedKeys={[location.pathname]} className="border-none" style={{ backgroundColor: 'transparent' }}>
        {renderMenuItems()}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
