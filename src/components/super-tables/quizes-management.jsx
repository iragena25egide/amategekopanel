import React, { useState } from 'react';
import { Card, Table, Tag, Tooltip } from 'antd';
import { QuestionCircleOutlined, UserOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';

const QuizManagement = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sortOrder, setSortOrder] = useState({});

  const data = [
    { key: '1', quiz_title: 'React Basics Quiz', mentor: 'John Doe', date_created: 'Mar 1, 2025', status: 'Published', attempts: 200 },
    { key: '2', quiz_title: 'JavaScript Advanced Quiz', mentor: 'Jane Smith', date_created: 'Feb 15, 2025', status: 'Draft', attempts: 85 },
    { key: '3', quiz_title: 'UI/UX Design Test', mentor: 'Emily Davis', date_created: 'Apr 10, 2025', status: 'Published', attempts: 150 },
    { key: '4', quiz_title: 'Python Basics Assessment', mentor: 'Michael Brown', date_created: 'Jan 20, 2025', status: 'Draft', attempts: 95 },
    { key: '5', quiz_title: 'Fullstack Development Quiz', mentor: 'Sarah Wilson', date_created: 'Mar 18, 2025', status: 'Published', attempts: 110 }
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
      title: renderSortableTitle('Quiz Title', 'quiz_title'),
      dataIndex: 'quiz_title',
      key: 'quiz_title',
      sorter: (a, b) => a.quiz_title.localeCompare(b.quiz_title),
    },
    {
      title: renderSortableTitle('Mentor', 'mentor'),
      dataIndex: 'mentor',
      key: 'mentor',
      sorter: (a, b) => a.mentor.localeCompare(b.mentor),
    },
    {
      title: renderSortableTitle('Date Created', 'date_created'),
      dataIndex: 'date_created',
      key: 'date_created',
      sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
    },
    {
      title: renderSortableTitle('Status', 'status'),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => <Tag color={status === 'Published' ? 'green' : 'red'}>{status}</Tag>
    },
    {
      title: renderSortableTitle('Attempts', 'attempts'),
      dataIndex: 'attempts',
      key: 'attempts',
      sorter: (a, b) => a.attempts - b.attempts
    }
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{ marginTop: '-4pc' }}>
          <span className="text-blue-500"><HomeOutlined /> / Quizzes</span>
          <h2 className="text-xl font-bold text-blue-500">Quiz Management</h2>
        </div>
      </div>
      <Card title="Quiz Management Overview">
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

export default QuizManagement;
