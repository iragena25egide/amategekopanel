// UpdateCourseForm.js

import React from "react";
import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

const UpdateCourseForm = ({ course, onSave }) => {
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    const updatedCourse = { ...course, ...values };
    onSave(updatedCourse);
    message.success("Course updated successfully");
  };

  return (
    <div>
      <h3>Update Course: {course.title}</h3>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: course.title,
          description: course.description,
        }}
        onFinish={handleUpdate}
      >
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true, message: "Please input the course title!" }]}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Course Description"
          rules={[{ required: true, message: "Please input the course description!" }]}
        >
          <TextArea rows={4} placeholder="Enter course description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCourseForm;
