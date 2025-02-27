import React, { useState } from 'react';
import { Card, Table, Tag, Button } from 'antd';
import { UserOutlined, BookOutlined, BarChartOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';

const ReportManagement = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const data = {
    Users: [
      { key: '1', type: 'User', name: 'John Doe', date: 'Jan 10, 2023', status: 'Active', details: 'Joined as student' },
      { key: '2', type: 'User', name: 'Emily Davis', date: 'Apr 20, 2023', status: 'Active', details: 'Upgraded to mentor' }
    ],
    Mentors: [
      { key: '3', type: 'Mentor', name: 'Jane Smith', date: 'Mar 12, 2023', status: 'Inactive', details: 'No active courses' },
      { key: '4', type: 'Mentor', name: 'Michael Brown', date: 'Jun 18, 2023', status: 'Active', details: '5 courses assigned' }
    ],
    Courses: [
      { key: '5', type: 'Course', name: 'React Native', date: 'Feb 15, 2023', status: 'Active', details: 'Enrolled by 120 students' },
      { key: '6', type: 'Course', name: 'Node.js Basics', date: 'May 5, 2023', status: 'Active', details: '50 students enrolled' }
    ],
    Quizzes: [
      { key: '7', type: 'Quiz', name: 'React Basics Quiz', date: 'Jul 2, 2023', status: 'Active', details: '20 questions' },
      { key: '8', type: 'Quiz', name: 'Node.js Final Quiz', date: 'Aug 14, 2023', status: 'Inactive', details: '15 questions' }
    ]
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data[activeTab].map(item => item.key));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (key) => {
    const newSelectedKeys = selectedKeys.includes(key)
      ? selectedKeys.filter(k => k !== key)
      : [...selectedKeys, key];
    setSelectedKeys(newSelectedKeys);
    setSelectAll(newSelectedKeys.length === data[activeTab].length);
  };

  const columns = [
    {
      title: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, 
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <input 
          type="checkbox" 
          checked={selectedKeys.includes(record.key)}
          onChange={() => handleRowSelect(record.key)}
        />
      )
    },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name', 
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => {
        const icon = record.type === 'User' ? <UserOutlined /> : record.type === 'Course' ? <BookOutlined /> : record.type === 'Mentor' ? <TeamOutlined /> : <BarChartOutlined />;
        return <span>{icon} {name}</span>;
      }
    },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date', 
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> 
    },
    { title: 'Details', dataIndex: 'details', key: 'details' }
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{marginTop:'-4pc'}}>
          <span className="text-blue-500"><HomeOutlined /> / Reports</span>
          <h2 className="text-xl font-bold text-blue-500">Reports and Analysis</h2>
        </div>
      </div>
      <Card title="Reports and Analytics Overview">
        <div className="flex space-x-4 mb-4">
          {['Users', 'Mentors', 'Courses', 'Quizzes'].map(tab => (
            <Button
              key={tab}
              type={activeTab === tab ? 'primary' : 'default'}
              className={activeTab === tab ? 'border-b-4 border-blue-500' : ''}
              onClick={() => {
                setActiveTab(tab);
                setSelectedKeys([]);
                setSelectAll(false);
              }}
            >
              {tab}
            </Button>
          ))}
        </div>
        <Table 
          columns={columns} 
          dataSource={data[activeTab]} 
          pagination={{ position: ['bottomRight'], pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ReportManagement;
