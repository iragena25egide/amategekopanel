import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

const AddModuleForm = ({ course, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // if (!course) {
  //   return <p className="text-red-500">Error: No course selected.</p>;
  // }

  const handleAddModule = (values) => {
    setLoading(true);
    const newModule = {
      key: Date.now(),
      title: values.title,
      description: values.description,
    };
    onSave(newModule);
    message.success("Module added successfully");
    form.resetFields();
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add Module to {course.title}</h2>
      <Form form={form} layout="vertical" onFinish={handleAddModule}>
        <Form.Item
          name="title"
          label="Module Title"
          rules={[{ required: true, message: "Please input the module title!" }]}
        >
          <Input placeholder="Enter module title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Module Description"
          rules={[{ required: true, message: "Please input the module description!" }]}
        >
          <TextArea rows={4} placeholder="Enter module description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Module
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddModuleForm;
