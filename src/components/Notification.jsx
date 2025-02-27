import React, { useState } from "react";
import { Card, Table, Tag, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const NotiReview = () => {
const [selectedRowKeys, setSelectedRowKeys] = useState([]);

const data = [
  {
    key: "1",
    title: "New Course Added",
    message: "A new course on React has been added.",
    date: "Feb 25, 2025",
    status: "Unread",
  },
  {
    key: "2",
    title: "Payment Received",
    message: "Your payment of $50 has been received.",
    date: "Feb 24, 2025",
    status: "Read",
  },
  {
    key: "3",
    title: "Assignment Deadline",
    message: "Submit your assignment by March 1.",
    date: "Feb 23, 2025",
    status: "Unread",
  },
  {
    key: "4",
    title: "Event Reminder",
    message: "Join the live webinar on Feb 28.",
    date: "Feb 22, 2025",
    status: "Read",
  },
  {
    key: "5",
    title: "Security Alert",
    message: "New login from an unrecognized device.",
    date: "Feb 21, 2025",
    status: "Unread",
  },
];

const handleView = (title) => {
  console.log(`Viewing: ${title}`);
};

const handleDelete = (title) => {
  console.log(`Deleting: ${title}`);
};

const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
};

const columns = [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Message", dataIndex: "message", key: "message" },
  { title: "Date", dataIndex: "date", key: "date" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Unread" ? "red" : "green"}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <>
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.title)}>
          View
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.title)}>
          Delete
        </Button>
      </>
    ),
  },
];

return (
  <div className="w-full min-h-screen p-6 bg-gray-100 mt-12">
    <Card title="Notifications">
      <Table columns={columns} dataSource={data} pagination={false} rowKey="key" rowSelection={rowSelection} />
    </Card>
  </div>
 );
};
export default NotiReview;