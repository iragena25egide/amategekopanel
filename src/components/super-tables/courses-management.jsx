import React, { useState } from 'react';
import { Card, Table, Tag, Tooltip } from 'antd';
import { BookOutlined, UserOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';

const CourseManagement = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sortOrder, setSortOrder] = useState({});

  const data = [
    { key: '1', course_title: 'React Native Basics', mentor: 'John Doe', start_date: 'Mar 1, 2025', status: 'Active', students: 120 },
    { key: '2', course_title: 'Advanced JavaScript', mentor: 'Jane Smith', start_date: 'Feb 15, 2025', status: 'Inactive', students: 85 },
    { key: '3', course_title: 'UI/UX Design', mentor: 'Emily Davis', start_date: 'Apr 10, 2025', status: 'Active', students: 95 },
    { key: '4', course_title: 'Python for Beginners', mentor: 'Michael Brown', start_date: 'Jan 20, 2025', status: 'Inactive', students: 150 },
    { key: '5', course_title: 'Fullstack Web Development', mentor: 'Sarah Wilson', start_date: 'Mar 18, 2025', status: 'Active', students: 110 }
  ];

  const handleSortChange = (columnKey, order) => {
    setSortOrder(prev => ({ ...prev, [columnKey]: order }));
  };

  const renderSortableTitle = (title, dataIndex) => (
    <Tooltip title={sortOrder[dataIndex] === 'ascend' ? 'Sorting: Ascending' : sortOrder[dataIndex] === 'descend' ? 'Sorting: Descending' : 'Click to sort'}>
      {title}
    </Tooltip>
  );

  const columns = [
    {
      title: <input type="checkbox" checked={selectedKeys.length === data.length} onChange={(e) => setSelectedKeys(e.target.checked ? data.map(item => item.key) : [])} />,
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <input type="checkbox" checked={selectedKeys.includes(record.key)} onChange={() => setSelectedKeys(prev => prev.includes(record.key) ? prev.filter(k => k !== record.key) : [...prev, record.key])} />
      )
    },
    {
      title: renderSortableTitle('Course Title', 'course_title'),
      dataIndex: 'course_title',
      key: 'course_title',
      sorter: (a, b) => a.course_title.localeCompare(b.course_title),
    },
    {
      title: renderSortableTitle('Mentor', 'mentor'),
      dataIndex: 'mentor',
      key: 'mentor',
      sorter: (a, b) => a.mentor.localeCompare(b.mentor),
    },
    {
      title: renderSortableTitle('Start Date', 'start_date'),
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    },
    {
      title: renderSortableTitle('Status', 'status'),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
    },
    {
      title: renderSortableTitle('Enrolled Students', 'students'),
      dataIndex: 'students',
      key: 'students',
      sorter: (a, b) => a.students - b.students
    }
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{ marginTop: '-4pc' }}>
          <span className="text-blue-500"><HomeOutlined /> / Courses</span>
          <h2 className="text-xl font-bold text-blue-500">Courses Management</h2>
        </div>
      </div>
      <Card title="Course Management Overview">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ position: ['bottomRight'], pageSize: 5 }} 
          rowKey="key" 
          onChange={(pagination, filters, sorter) => handleSortChange(sorter.columnKey, sorter.order)}
        />
      </Card>
    </div>
  );
};

export default CourseManagement;
