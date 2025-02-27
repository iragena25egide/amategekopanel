import React, { useState } from "react";
import { Card, Table, Checkbox, Button, Dropdown, Menu, Modal, Input, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const Questions = () => {
  const [courses, setCourses] = useState([
    { key: 1, course: "React Basics", numQuestions: 0, maxTime: "30 mins", answerDoc: "None" },
    { key: 2, course: "Advanced React", numQuestions: 0, maxTime: "45 mins", answerDoc: "None" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  const handleAddQuestion = () => {
    openModal(
      <div>
        <Input.TextArea rows={4} placeholder="Type your question here..." />
        <Button type="primary" className="mt-2" onClick={() => message.success("Question added successfully")}>Add</Button>
      </div>
    );
  };

  const handleChangeTime = () => {
    openModal(
      <div>
        <Input placeholder="Enter new time (e.g., 40 mins)" />
        <Button type="primary" className="mt-2" onClick={() => message.success("Time updated successfully")}>Change</Button>
      </div>
    );
  };

  const handleAddAnswerDoc = () => {
    openModal(
      <div>
        <Input placeholder="Upload or link answer document" />
        <Button type="primary" className="mt-2" onClick={() => message.success("Answer document added successfully")}>Add</Button>
      </div>
    );
  };

  const columns = [
    {
      title: <Checkbox />, 
      key: "checkbox",
      render: () => <Checkbox />,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Number of Questions",
      dataIndex: "numQuestions",
      key: "numQuestions",
    },
    {
      title: "Max Time",
      dataIndex: "maxTime",
      key: "maxTime",
    },
    {
      title: "Answer Document",
      dataIndex: "answerDoc",
      key: "answerDoc",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="add-question" onClick={handleAddQuestion} style={{color:'green'}}>Add Question</Menu.Item>
              <Menu.Item key="add-answer-doc" onClick={handleAddAnswerDoc} style={{color:'blue'}}>Add Answer Document</Menu.Item>
              <Menu.Item key="change-time" onClick={handleChangeTime} style={{color:'orange'}}>Change Time</Menu.Item>
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
    <Card title="Manage Questions" style={{ width: "100%" }}>
      <Table dataSource={courses} columns={columns} pagination={{ position: ["bottomRight"] }} rowKey="key" />
      <Modal open={isModalVisible} footer={null} onCancel={closeModal} bodyStyle={{ padding: "20px" }} maskClosable={false}>
        {modalContent}
      </Modal>
    </Card>
  );
};

export default Questions;
