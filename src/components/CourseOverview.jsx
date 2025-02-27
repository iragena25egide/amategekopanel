import React, { useState } from 'react';
import { Card, Table, Tag } from 'antd';

const CourseOverview = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data.map(item => item.key));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (key) => {
    setSelectedKeys(prevKeys =>
      prevKeys.includes(key)
        ? prevKeys.filter(k => k !== key)
        : [...prevKeys, key]
    );
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
          onChange={() => handleCheckboxChange(record.key)}
        />
      )
    },
    { title: 'Username', dataIndex: 'username', key: 'username', sorter: (a, b) => a.username.localeCompare(b.username) },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => new Date(a.date) - new Date(b.date) },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'online' ? 'green' : 'blue'}>{status}</Tag> },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Course Title', dataIndex: 'course_title', key: 'course_title', sorter: (a, b) => a.course_title.localeCompare(b.course_title) },
    { title: 'Course Status', dataIndex: 'course_status', key: 'course_status', sorter: (a, b) => a.course_status.localeCompare(b.course_status), render: course_status => <Tag color={course_status === 'ended' ? 'green' : 'red'}>{course_status}</Tag> },
  ];

  const data = [
    { key: '1', username: 'Dalton', date: 'Jan 6, 2022', status: 'online', Email: 'user@personal.com', course_title: 'React Native', course_status: 'ended' },
    { key: '2', username: 'Dalton', date: 'Jan 6, 2022', status: 'offline', Email: 'user@personal.com', course_title: 'React Native', course_status: 'pending' },
    { key: '3', username: 'Dalton', date: 'Jan 5, 2022', status: 'online', Email: 'user@personal.com', course_title: 'React Native', course_status: 'ended' },
    { key: '4', username: 'Dalton', date: 'Jan 5, 2022', status: 'offline', Email: 'user@personal.com', course_title: 'React Native', course_status: 'pending' },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <Card title="Courses Overview">
        <Table columns={columns} dataSource={data} pagination={{ position: ['bottomRight'], pageSize: 5 }} rowKey="key" />
      </Card>
    </div>
  );
};

export default CourseOverview;
