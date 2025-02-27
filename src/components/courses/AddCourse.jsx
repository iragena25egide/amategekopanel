import React from "react";
import { Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddCourse = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleAddCourse = (values) => {
    const newCourse = {
      key: Date.now(),
      title: values.title,
      description: values.description,
      timestamp: new Date().toLocaleString(),
      modules: [],
      videos: [],
    };
    onSave(newCourse);
    form.resetFields();
    message.success("Course added successfully");
    onClose();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleAddCourse}>
      <Form.Item name="title" label="Course Title" rules={[{ required: true, message: "Please input the course title!" }]}>
        <Input placeholder="Enter course title" />
      </Form.Item>
      <Form.Item name="description" label="Course Description" rules={[{ required: true, message: "Please input the course description!" }]}>
        <TextArea rows={4} placeholder="Enter course description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCourse;
