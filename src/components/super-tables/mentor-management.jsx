import React, { useState } from 'react';
import { Card, Table, Tag, Dropdown, Menu, Modal } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, MoreOutlined, HomeOutlined } from '@ant-design/icons';

const MentorManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(data.map((item) => item.key));
      setSelectAll(true);
    } else {
      setSelectedRowKeys([]);
      setSelectAll(false);
    }
  };

  const handleSelect = (key) => {
    setSelectedRowKeys((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((k) => k !== key)
        : [...prevSelected, key]
    );
  };

  const handleView = (mentor) => {
    setSelectedMentor(mentor);
    setViewModal(true);
  };

  const handleDelete = (mentor) => {
    setMentorToDelete(mentor);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setDeleteModal(false);
    console.log(`Deleted mentor: ${mentorToDelete.mentor_name}`);
  };

  const columns = [
    {
      title: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, 
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.key)}
          onChange={() => handleSelect(record.key)}
        />
      ),
    },
    {
      title: 'Mentor Name',
      dataIndex: 'mentor_name',
      key: 'mentor_name',
      sorter: (a, b) => a.mentor_name.localeCompare(b.mentor_name),
      render: name => <span><UserOutlined /> {name}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: email => <span><MailOutlined /> {email}</span>
    },
    {
      title: 'Join Date',
      dataIndex: 'join_date',
      key: 'join_date',
      sorter: (a, b) => new Date(a.join_date) - new Date(b.join_date),
      render: date => <span><CalendarOutlined /> {date}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
    },
    {
      title: 'Courses Assigned',
      dataIndex: 'courses_assigned',
      key: 'courses_assigned',
      sorter: (a, b) => a.courses_assigned - b.courses_assigned
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="2" style={{ color: 'red' }} onClick={() => handleDelete(record)}>Delete</Menu.Item>
              <Menu.Item key="3" style={{ color: 'green' }} onClick={() => handleView(record)}>View</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
        </Dropdown>
      ),
    },
  ];

  const data = [
    { key: '1', mentor_name: 'John Doe', email: 'john.doe@example.com', join_date: '2023-01-10', status: 'Active', courses_assigned: 5 },
    { key: '2', mentor_name: 'Jane Smith', email: 'jane.smith@example.com', join_date: '2023-02-15', status: 'Inactive', courses_assigned: 3 },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{ marginTop: '-4pc' }}>
          <span className="text-blue-500"><HomeOutlined /> / Mentor</span>
          <h2 className="text-xl font-bold text-blue-500">Mentor Management</h2>
        </div>
      </div>
      <Card title="Mentor Management Overview">
        <Table columns={columns} dataSource={data} pagination={{ position: ['bottomRight'], pageSize: 3 }} rowKey="key" />
      </Card>
      <Modal
        title={`Are you sure you want to delete mentor "${mentorToDelete?.mentor_name}"?`}
        visible={deleteModal}
        onOk={confirmDelete}
        onCancel={() => setDeleteModal(false)}
        closable={true}
      >
        <p>This action cannot be undone.</p>
      </Modal>
      <Modal
        title={`Mentor Details - ${selectedMentor?.mentor_name}`}
        visible={viewModal}
        onOk={() => setViewModal(false)}
        onCancel={() => setViewModal(false)}
        closable={true}
      >
        {selectedMentor && (
          <div>
            <p><UserOutlined /> Name: {selectedMentor.mentor_name}</p>
            <p><MailOutlined /> Email: {selectedMentor.email}</p>
            <p><CalendarOutlined /> Join Date: {selectedMentor.join_date}</p>
            <p><HomeOutlined /> Status: {selectedMentor.status}</p>
            <p>Courses Assigned: {selectedMentor.courses_assigned}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MentorManagement;
