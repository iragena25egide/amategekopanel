import React, { useState } from "react";
import { Table, Checkbox, Card } from "antd";

const RecentSuperTable = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [selectAllCourses, setSelectAllCourses] = useState(false);

  const handleSelectAllUsers = (e) => {
    setSelectAllUsers(e.target.checked);
    setSelectedUsers(e.target.checked ? userData.map((item) => item.key) : []);
  };

  const handleSelectAllCourses = (e) => {
    setSelectAllCourses(e.target.checked);
    setSelectedCourses(e.target.checked ? courseData.map((item) => item.key) : []);
  };

  const handleUserCheckboxChange = (key) => {
    setSelectedUsers((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCourseCheckboxChange = (key) => {
    setSelectedCourses((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const userColumns = [
    {
      title: <Checkbox onChange={handleSelectAllUsers} checked={selectAllUsers} />, 
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedUsers.includes(record.key)}
          onChange={() => handleUserCheckboxChange(record.key)}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const courseColumns = [
    {
      title: <Checkbox onChange={handleSelectAllCourses} checked={selectAllCourses} />, 
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedCourses.includes(record.key)}
          onChange={() => handleCourseCheckboxChange(record.key)}
        />
      ),
    },
    {
      title: "Course Title",
      dataIndex: "title",
    },
    {
      title: "Course Description",
      dataIndex: "description",
    },
  ];

  const userData = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      key: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
    },
    {
      key: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    {
      key: "5",
      name: "Robert Brown",
      email: "robert.brown@example.com",
    },
  ];

  const courseData = [
    {
      key: "1",
      title: "React Basics",
      description: "Introduction to React and JSX",
    },
    {
      key: "2",
      title: "Advanced React",
      description: "State management and hooks",
    },
    {
      key: "3",
      title: "UI/UX Design",
      description: "Principles of user interface design",
    },
    {
      key: "4",
      title: "JavaScript Essentials",
      description: "Core JS concepts and ES6+",
    },
    {
      key: "5",
      title: "Backend with Node.js",
      description: "Building APIs with Express",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Recent Users Section */}
      <Card className="p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Recent Users</h2>
        <div className="border-b-2 border-gray-200 my-2"></div>
        <Table columns={userColumns} dataSource={userData} pagination={false} rowKey="key" />
      </Card>
      
      {/* Recent Courses Section */}
      <Card className="p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Recent Courses</h2>
        <div className="border-b-2 border-gray-200 my-2"></div>
        <Table columns={courseColumns} dataSource={courseData} pagination={false} rowKey="key" />
      </Card>
    </div>
  );
};

export default RecentSuperTable;