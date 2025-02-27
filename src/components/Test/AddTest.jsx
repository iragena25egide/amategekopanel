import React from "react";
import { Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddTest = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleAddTest = (values) => {
    const newTest = {
      key: Date.now(),
      title: values.title,
      description: values.description,
      timestamp: new Date().toLocaleString(),
      modules: [],
      videos: [],
    };
    onSave(newTest);
    form.resetFields();
    message.success("Quiz added successfully");
    onClose();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleAddTest}>
      <Form.Item name="title" label="Quiz Title" rules={[{ required: true, message: "Please input the Quiz title!" }]}>
        <Input placeholder="Enter Quiz title" />
      </Form.Item>
      <Form.Item name="description" label="Quiz Description" rules={[{ required: true, message: "Please input the Quiz description!" }]}>
        <TextArea rows={4} placeholder="Enter Quiz description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add Quiz
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTest;
