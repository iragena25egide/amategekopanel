import React, { useState } from "react";
import { Card, Button, Table, Dropdown, Menu, Modal, Checkbox } from "antd";
import { PlusOutlined, MoreOutlined, CloseOutlined, HistoryOutlined, HomeOutlined } from "@ant-design/icons";
import AddCourse from "./courses/AddCourse";
import RecentCourses from "./courses/RecentCourses";
import AddModuleForm from "./courses/AddModuleForm";
import ViewModules from "./courses/ViewModules";
import AddVideoForm from "./courses/AddVideoForm";
import ManageVideos from "./courses/ManageVideos";
import UpdateCourseForm from "./courses/UpdateCourseForm";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      key: 1,
      title: "React for Beginners",
      description: "Learn the basics of React, including components, hooks, and state management.",
      timestamp: new Date().toLocaleString(),
      modules: [],
      videos: [],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  const onSelectAll = (e) => {
    setSelectedRowKeys(e.target.checked ? courses.map(course => course.key) : []);
  };

  const onSelectRow = (key) => {
    setSelectedRowKeys((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((selectedKey) => selectedKey !== key)
        : [...prevSelected, key]
    );
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => openModal(<AddModuleForm course={record} />)} style={{ color: "blue" }}>
        Add Module
      </Menu.Item>
      <Menu.Item key="2" onClick={() => openModal(<ViewModules course={record} />)} style={{ color: "green" }}>
        View Modules
      </Menu.Item>
      <Menu.Item key="3" onClick={() => openModal(<AddVideoForm course={record} />)} style={{ color: "purple" }}>
        Add Video
      </Menu.Item>
      <Menu.Item key="4" onClick={() => openModal(<ManageVideos course={record} />)} style={{ color: "orange" }}>
        Manage Video
      </Menu.Item>
      <Menu.Item key="5" onClick={() => openModal(<UpdateCourseForm course={record} />)} style={{ color: "red" }}>
        Update Course
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: <Checkbox onChange={onSelectAll} checked={selectedRowKeys.length === courses.length} />,
      key: "checkbox",
      render: (_, record) => (
        <Checkbox onChange={() => onSelectRow(record.key)} checked={selectedRowKeys.includes(record.key)} />
      ),
    },
    {
      title: "Course Title",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click", "hover"]}>
          <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2" style={{ marginTop: '-4pc' }}>
          <span className="text-blue-500"><HomeOutlined /> / Courses</span>
          <h2 className="text-xl font-bold text-blue-500">Courses Management</h2>
        </div>
      </div>
      <div className="flex justify-start space-x-4 mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal(<AddCourse />)}>
          Add Course
        </Button>
        <Button type="default" icon={<HistoryOutlined />} onClick={() => openModal(<RecentCourses courses={courses} />)}>
          View Recent Courses
        </Button>
      </div>

      <Card title="All Courses">
        <Table dataSource={courses} columns={columns} pagination={{ position: ['bottomRight'] }} rowKey="key" bordered scroll={{ y: 200 }} />
      </Card>

      <Modal open={isModalVisible} footer={null} onCancel={closeModal} closeIcon={<CloseOutlined />} centered maskClosable={false} bodyStyle={{ padding: "20px" }}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Courses;
