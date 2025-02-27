// ManageVideos.js

import React, { useState } from "react";
import { Form, Input, Button, List, Upload, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const ManageVideos = ({ course, onUpdate }) => {
  const [videos, setVideos] = useState(course.videos || []);
  const [form] = Form.useForm();

  const handleAddVideo = (values) => {
    const newVideo = { ...values, id: Date.now() };
    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    onUpdate(updatedVideos);
    form.resetFields();
    message.success("Video added successfully");
  };

  const handleDeleteVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
    onUpdate(updatedVideos);
    message.success("Video deleted successfully");
  };

  return (
    <div>
      <h3>Manage Videos for {course.title}</h3>
      <Form form={form} layout="vertical" onFinish={handleAddVideo}>
        <Form.Item
          name="title"
          label="Video Title"
          rules={[{ required: true, message: "Please input the video title!" }]}
        >
          <Input placeholder="Enter video title" />
        </Form.Item>

        <Form.Item
          name="url"
          label="Video URL"
          rules={[{ required: true, message: "Please input the video URL!" }]}
        >
          <Input placeholder="Enter video URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>
            Add Video
          </Button>
        </Form.Item>
      </Form>

      <List
        header={<div>Video List</div>}
        bordered
        dataSource={videos}
        renderItem={(video) => (
          <List.Item
            actions={[<Button icon={<DeleteOutlined />} onClick={() => handleDeleteVideo(video.id)}>Delete</Button>]}
          >
            <List.Item.Meta title={video.title} description={video.url} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManageVideos;
