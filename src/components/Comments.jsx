import React, { useState } from 'react';
import { Card, Table, Tag, Modal, Button } from 'antd';
import { MailOutlined, MailFilled } from '@ant-design/icons';

const Comments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([
    { key: '1', username: 'Dalton', date: 'Jan 6, 2022', status: 'online', Email: 'user@personal.com', Course_Title: 'react native', Course_Status: 'ended', comment: 'Comment from Dalton', read: false },
    { key: '2', username: 'Egide', date: 'Jan 6, 2022', status: 'offline', Email: 'user@personal.com', Course_Title: 'react native', Course_Status: 'pending', comment: 'Comment from Egide', read: true },
    { key: '3', username: 'Batizo', date: 'Jan 5, 2022', status: 'online', Email: 'user@personal.com', Course_Title: 'react native', Course_Status: 'ended', comment: 'Comment from Batizo', read: false },
    { key: '4', username: 'Gael', date: 'Jan 5, 2022', status: 'offline', Email: 'user@personal.com', Course_Title: 'react native', Course_Status: 'pending', comment: 'Comment from Gael', read: true },
    { key: '5', username: 'Rutwe', date: 'Jan 5, 2022', status: 'online', Email: 'user@personal.com', Course_Title: 'react native', Course_Status: 'ended', comment: 'Comment from Rutwe', read: false },
  ]);

  const showModal = (commentKey) => {
    const updatedData = data.map(item =>
      item.key === commentKey ? { ...item, read: true } : item
    );
    setData(updatedData);
    const selectedComment = updatedData.find(item => item.key === commentKey);
    setCurrentComment(selectedComment.comment);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username', sorter: (a, b) => a.username.localeCompare(b.username) },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => new Date(a.date) - new Date(b.date) },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'online' ? 'green' : 'blue'}>{status}</Tag> },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Course Title', dataIndex: 'Course_Title', key: 'Course_Title', sorter: (a, b) => a.Course_Title.localeCompare(b.Course_Title) },
    { title: 'Course Status', dataIndex: 'Course_Status', key: 'Course_Status', sorter: (a, b) => a.Course_Status.localeCompare(b.Course_Status), render: status => <Tag color={status === 'ended' ? 'green' : 'blue'}>{status}</Tag> },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (text, record) => (
        <span onClick={() => showModal(record.key)} style={{ cursor: 'pointer', color: record.read ? 'red' : 'green' }}>
          {record.read ? <MailOutlined /> : <MailFilled />} {record.read ? 'read' : 'unread'}
        </span>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <Card title="Comments Overview">
        <Table 
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={data} 
          pagination={{ position: ['bottomRight'], pageSize: 5 }}
        />
      </Card>
      <Modal 
        title="Comment" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={[<Button key="ok" onClick={handleOk}>OK</Button>]}
      >
        <p>{currentComment}</p>
      </Modal>
    </div>
  );
};

export default Comments;
