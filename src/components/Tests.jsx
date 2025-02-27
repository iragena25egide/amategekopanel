import React, { useState } from "react";
import { Card, Button, Table, Dropdown, Menu, Modal, message, Checkbox } from "antd";
import { PlusOutlined, MoreOutlined, HistoryOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import AddTest from "./Test/AddTest";
import RecentTest from "./Test/RecentTest";
import Questions from "./Questions";

const Tests = () => {
  const [tests, setTests] = useState([
    {
      key: 1,
      title: "React for Beginners",
      description: "Learn the basics of React, including components, hooks, and state management.",
      timestamp: new Date().toLocaleString(),
    },
    {
      key: 2,
      title: "Advanced React",
      description: "Deep dive into React hooks, context API, and performance optimization.",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [deleteTestKey, setDeleteTestKey] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  const handleAddTest = (newTest) => {
    setTests((prevTests) => [...prevTests, newTest]);
    message.success("Test added successfully");
    closeModal();
  };

  const handleDeleteTest = () => {
    setTests(tests.filter((test) => test.key !== deleteTestKey));
    setDeleteModalVisible(false);
    message.success("Test deleted successfully");
  };

  const confirmDelete = (key) => {
    setDeleteTestKey(key);
    setDeleteModalVisible(true);
  };

  const handleSelectAll = (e) => {
    setSelectedKeys(e.target.checked ? tests.map((test) => test.key) : []);
  };

  const handleSelect = (key) => {
    setSelectedKeys((prevKeys) =>
      prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]
    );
  };

  const columns = [
    {
      title: <Checkbox onChange={handleSelectAll} checked={selectedKeys.length === tests.length} />, 
      key: "checkbox",
      render: (_, test) => (
        <Checkbox checked={selectedKeys.includes(test.key)} onChange={() => handleSelect(test.key)} />
      ),
    },
    {
      title: "Test Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    },
    {
      title: "Action",
      key: "action",
      render: (_, test) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="add-question" onClick={() => openModal(<Questions testId={test.key} />)} style={{color:'green'}}>
                Add Question
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => confirmDelete(test.key)} style={{ color: "#f5222d" }}>
                Delete Test
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="p-4 flex justify-start space-x-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal(<AddTest/>)}>
          Add Quiz
        </Button>
        <Button icon={<HistoryOutlined />} onClick={() => openModal(<RecentTest Test={tests} />)}>
          Recent Quiz
        </Button>
      </div>

      <div className="p-4">
        <Card title="All Tests">
          <Table 
            dataSource={tests} 
            columns={columns} 
            pagination={{ position: ['bottomRight'] }} 
            rowKey="key" 
            bordered 
            scroll={{ y: 200 }} 
          />
        </Card>
      </div>

      <Modal open={isModalVisible} footer={null} onCancel={closeModal} maskClosable={false} bodyStyle={{ padding: "20px"}} width={600}>
        {modalContent}
      </Modal>

      <Modal
        title={<span><ExclamationCircleOutlined style={{ color: "#faad14" }} /> Confirm Delete</span>}
        open={deleteModalVisible}
        onOk={handleDeleteTest}
        onCancel={() => setDeleteModalVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this quiz?</p>
      </Modal>
    </div>
  );
};

export default Tests;