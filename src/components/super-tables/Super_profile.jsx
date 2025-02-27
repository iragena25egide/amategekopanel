import React, { useState } from 'react';
import { Card, Avatar, Tabs, Form, Input, Button, Switch, message, Dropdown, Menu } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const { TabPane } = Tabs;

message.config({
  top: 50,
  duration: 2,
});

const Prox = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [settings, setSettings] = useState({
    follows: true,
    answers: false,
    mentions: true,
    launches: false,
    updates: true,
    newsletter: true,
  });

  const navigate = useNavigate();

  const handleTabChange = (key) => setActiveTab(key);
  const toggleSetting = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleMenuClick = (key) => {
    navigate(`/view-all/${key}`);
  };

  const menu = (key) => (
    <Menu onClick={() => handleMenuClick(key)}>
      <Menu.Item key="viewAll">View All</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex p-6 gap-6 mt-12">
      <Card className="w-1/3 bg-white shadow-lg flex flex-col items-center p-4" style={{ height: '320px' }}>
        <Avatar size={150} src="https://via.placeholder.com/150" className="mx-auto" />
        <h2 className="text-center text-xl mt-4">Super Admin Name</h2>
        <p className="text-center text-gray-500">Super Admin</p>
      </Card>

      <Card className="w-2/3 bg-white shadow-lg" style={{ height: '545px' }}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} tabBarGutter={20} className="mb-6">
          <TabPane tab={<span>Overview <Dropdown overlay={menu('overview')} trigger={['click']}><DownOutlined className="ml-2" /></Dropdown></span>} key="overview" />
          <TabPane tab={<span>Edit Profile <Dropdown overlay={menu('edit')} trigger={['click']}><DownOutlined className="ml-2" /></Dropdown></span>} key="edit" />
          <TabPane tab={<span>Settings <Dropdown overlay={menu('settings')} trigger={['click']}><DownOutlined className="ml-2" /></Dropdown></span>} key="settings" />
          <TabPane tab={<span>Change Password <Dropdown overlay={menu('password')} trigger={['click']}><DownOutlined className="ml-2" /></Dropdown></span>} key="password" />
        </Tabs>

        {activeTab === 'overview' && (
          <div className="p-8" style={{ marginTop: '-20px' }}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-500">Super Admin <span style={{ color: '#1890ff' }}>Overview</span></h2>
            <p className="mb-4 text-gray-500">Welcome to the super admin panel. Manage users, mentors, courses, and platform settings from here.</p>
            <p className="mb-4 text-gray-500"><strong style={{ color: '#1890ff' }}>Full Name:</strong> Alex Johnson</p>
            <p className="mb-4 text-gray-500"><strong style={{ color: '#1890ff' }}>Mobile:</strong> (44) 987 6543 210</p>
            <p className="mb-4 text-gray-500"><strong style={{ color: '#1890ff' }}>Email:</strong> alexjohnson@admin.com</p>
            <p className="mb-4 text-gray-500"><strong style={{ color: '#1890ff' }}>Location:</strong> Global Access</p>
            <p className="mb-4 text-gray-500"> <strong style={{ color: '#1890ff' }}>Social:</strong> <FacebookOutlined className="mx-2 text-gray-500" /> <TwitterOutlined className="mx-2 text-gray-500" /><InstagramOutlined className="mx-2 text-gray-500" /></p>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-500">Edit<span style={{ color: '#1890ff' }}> Profile</span></h2>
            <Form layout="vertical" >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}> <Input className="rounded-md" /> </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}> <Input className="rounded-md" /> </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-gray-500 hover:bg-gray-800 text-white rounded-md">Save</Button>
              </Form.Item>
            </Form>
          </div>
        )}

{activeTab === 'settings' && (
  <div className="p-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-500">Course Platform <span style={{ color: '#1890ff' }}> Settings</span></h2>
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-500">NOTIFICATIONS</h3>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Notify me about new course updates</span>
        <Switch checked={settings.courseUpdates} onChange={() => toggleSetting('courseUpdates')} />
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Notify me about new messages from mentors</span>
        <Switch checked={settings.mentorMessages} onChange={() => toggleSetting('mentorMessages')} />
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Send reminders for upcoming exams</span>
        <Switch checked={settings.examReminders} onChange={() => toggleSetting('examReminders')} />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-blue-500">APPLICATION</h3>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Notify me about subscription payment due dates</span>
        <Switch checked={settings.subscriptionPayments} onChange={() => toggleSetting('subscriptionPayments')} />
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Remind me to complete pending course assignments</span>
        <Switch checked={settings.courseAssignments} onChange={() => toggleSetting('courseAssignments')} />
      </div>
      <div className="flex items-center justify-between my-2">
        <span className="text-gray-500">Notify me about new user enrollments</span>
        <Switch checked={settings.userEnrollments} onChange={() => toggleSetting('userEnrollments')} />
      </div>
    </div>
  </div>
)}


        {activeTab === 'password' && (
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-500">Change <span style={{ color: '#1890ff' }}>Password</span></h2>
            <Form layout="vertical">
              <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}> <Input.Password className="rounded-md" /> </Form.Item>
              <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}> <Input.Password className="rounded-md" /> </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-gray-500 hover:bg-gray-800 text-white rounded-md">Save</Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Prox;
