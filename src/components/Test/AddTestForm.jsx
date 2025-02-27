import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import PropTypes from "prop-types";

const { TextArea } = Input;

const AddTestForm = ({ test = {}, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddTest = (values) => {
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
      <h2 className="text-lg font-bold mb-4">
        Add Module to {test?.title || "Untitled Test"}
      </h2>

      <Form form={form} layout="vertical" onFinish={handleAddTest}>
        <Form.Item
          name="title"
          label="Module Title"
          rules={[{ required: true, message: "Please input the Module title!" }]}
        >
          <Input placeholder="Enter Module title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Module Description"
          rules={[{ required: true, message: "Please input the Module description!" }]}
        >
          <TextArea rows={4} placeholder="Enter Module description" />
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

AddTestForm.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default AddTestForm;