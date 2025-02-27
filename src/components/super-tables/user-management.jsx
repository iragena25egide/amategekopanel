import React, { useState } from 'react';
import { Card, Table, Tag, Tooltip, Dropdown, Menu, Button, Modal } from 'antd';
import { MoreOutlined, HomeOutlined } from '@ant-design/icons';

const UserManagement = () => {
  const [sortOrder, setSortOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({});
  const [subscriptionType, setSubscriptionType] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]); // Track selected rows

  // ✅ Move 'data' above where it's used to fix the ReferenceError
  const data = [
    { key: '1', Fullname: 'Dalton', Username: 'DALTON', Email: 'user@personal.com', status: 'online' },
    { key: '2', Fullname: 'Egide', Username: 'EGIDE', Email: 'user@personal.com', status: 'offline' },
    { key: '3', Fullname: 'Batizo', Username: 'BATIZO', Email: 'user@personal.com', status: 'online' },
  ];

  const handleAction = (key, action) => {
    Modal.confirm({
      title: `Are you sure you want to ${action.toLowerCase()} this account?`,
      content: 'This action cannot be undone.',
      okText: 'OK',
      cancelText: 'Cancel',
      centered: true,
    });
  };

  const handlePaymentStatusChange = (key, status, color) => {
    setPaymentStatus((prev) => ({ ...prev, [key]: { label: status, color } }));
  };

  const handleSubscriptionTypeChange = (key, type, color) => {
    setSubscriptionType((prev) => ({ ...prev, [key]: { label: type, color } }));
  };

  // ✅ Handle Select All / Unselect All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedKeys(data.map((item) => item.key)); // Select all
    } else {
      setSelectedKeys([]); // Deselect all
    }
  };

  // ✅ Handle individual checkbox selection
  const handleRowSelect = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const columns = [
    {
      title: (
        <Tooltip title="Select all">
          <input
            type="checkbox"
            checked={selectedKeys.length === data.length} // Check if all are selected
            onChange={handleSelectAll}
          />
        </Tooltip>
      ),
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <Tooltip title="Select row">
          <input
            type="checkbox"
            checked={selectedKeys.includes(record.key)}
            onChange={() => handleRowSelect(record.key)}
          />
        </Tooltip>
      ),
    },
    { 
      title: <Tooltip title="Sort by Fullname">Fullname</Tooltip>,
      dataIndex: 'Fullname', 
      key: 'Fullname', 
      sorter: (a, b) => a.Fullname.localeCompare(b.Fullname), 
      sortOrder
    },
    { 
      title: <Tooltip title="Sort by Username">Username</Tooltip>,
      dataIndex: 'Username', 
      key: 'Username',
      sorter: (a, b) => a.Username.localeCompare(b.Username),
      sortOrder
    },
    { 
      title: <Tooltip title="Sort by Email">Email</Tooltip>,
      dataIndex: 'Email', 
      key: 'Email',
      sorter: (a, b) => a.Email.localeCompare(b.Email),
      sortOrder
    },
    {
      title: <Tooltip title="Sort by Status">Status</Tooltip>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === 'online' ? 'green' : 'blue'}>{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleAction(record.key, 'Suspend')} style={{ color: 'red' }}>
                Suspend Account
              </Menu.Item>
              <Menu.Item onClick={() => handleAction(record.key, 'Delete')} style={{ color: 'red' }}>
                Delete Account
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
    {
      title: 'Payment Status',
      key: 'paymentStatus',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handlePaymentStatusChange(record.key, 'Paid', 'green')}>
                <Tag color="green">Paid</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handlePaymentStatusChange(record.key, 'Never Paid', 'blue')}>
                <Tag color="blue">Never Paid</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handlePaymentStatusChange(record.key, 'Expired Subscription', 'red')}>
                <Tag color="red">Expired Subscription</Tag>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text">
            {paymentStatus[record.key] ? (
              <Tag color={paymentStatus[record.key].color}>{paymentStatus[record.key].label}</Tag>
            ) : (
              <MoreOutlined />
            )}
          </Button>
        </Dropdown>
      ),
    },
    {
      title: 'Subscription Type',
      key: 'subscriptionType',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleSubscriptionTypeChange(record.key, 'Mini (2 Tests) - 300 RWF', 'purple')}>
                <Tag color="purple">Mini (2 Tests) - 300 RWF</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handleSubscriptionTypeChange(record.key, 'Basic (5 Tests) - 500 RWF', 'cyan')}>
                <Tag color="cyan">Basic (5 Tests) - 500 RWF</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handleSubscriptionTypeChange(record.key, 'Nova (1 Week) - 5000 RWF', 'blue')}>
                <Tag color="blue">Nova (1 Week) - 5000 RWF</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handleSubscriptionTypeChange(record.key, 'Classic (2 Weeks) - 8000 RWF', 'orange')}>
                <Tag color="orange">Classic (2 Weeks) - 8000 RWF</Tag>
              </Menu.Item>
              <Menu.Item onClick={() => handleSubscriptionTypeChange(record.key, 'Premium (1 Month) - 10000 RWF', 'gold')}>
                <Tag color="gold">Premium (1 Month) - 10000 RWF</Tag>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text">
            {subscriptionType[record.key] ? (
              <Tag color={subscriptionType[record.key].color}>{subscriptionType[record.key].label}</Tag>
            ) : (
              <MoreOutlined />
            )}
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{ marginTop: '-4pc' }}>
          <span className="text-blue-500"><HomeOutlined /> / User</span>
          <h2 className="text-xl font-bold text-blue-500">User Management</h2>
        </div>
      </div>
      <Card title="Users Overview">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ position: ['bottomRight'], pageSize: 5 }} 
          rowKey="key" 
        />
      </Card>
    </div>
  );
};

export default UserManagement;
