import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddVideoForm = ({ course, onSave }) => {
  const [form] = Form.useForm();

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFinish = (values) => {
    const newVideo = {
      title: values.title,
      description: values.description,
      file: values.upload.file.name,
    };
    onSave(newVideo);
    form.resetFields();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Video to {course.title}</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Video Title" rules={[{ required: true, message: "Please enter the video title" }]}> 
          <Input placeholder="Enter video title" />
        </Form.Item>
        <Form.Item name="description" label="Video Description"> 
          <TextArea rows={3} placeholder="Enter video description" />
        </Form.Item>
        <Form.Item name="upload" label="Upload Video" valuePropName="fileList" getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList} rules={[{ required: true, message: "Please upload a video file" }]}> 
          <Upload name="video" action="/upload" onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Video</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVideoForm;
