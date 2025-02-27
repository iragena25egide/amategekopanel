import React from "react";
import { Dropdown, Menu, Card, Badge, Button } from "antd";
import { BellOutlined, BellFilled, UserOutlined, FileOutlined, LogoutOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, message: "New message from Alice", date: "2025-02-23" },
  { id: 2, message: "Your order has been shipped", date: "2025-02-22" },
  { id: 3, message: "Reminder: Meeting at 3 PM", date: "2025-02-21" }
];

const NotificationPanel = ({ userRole }) => {
  const navigate = useNavigate();


  const subAdminRoute = "/sub_admin_dashboard"; // Specify your sub-admin route
  const superAdminRoute = "/super_admin_dashboard"; // Specify your super-admin route

  const menuProfile = (
    <Menu className="rounded-lg shadow-lg border border-gray-200 w-[200px]" style={{marginRight:'2pc'}}>
      <div className="flex justify-center items-center flex-col">
        <img src="https://i.pravatar.cc/40" alt="User" className="rounded-full w-[100px] h-[100px] border border-gray-200" />
        <h4 className="text-xl font-bold text-gray-600 text-center">Mu Baptiste</h4>
        <h5 className="text-center text-gray-600">mubaptiste@gmail.com</h5>
        <p className="text-green-600 text-center">9 students active</p>
      </div>
      <hr />
      <Menu.Item key="profile" icon={<UserOutlined />} className="hover:bg-gray-100 p-2 rounded-md "onClick={() => navigate(userRole === "super-admin" ? "/super_profile" : "/profile")}>Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="courses" icon={<FileOutlined />} className="hover:bg-gray-100 p-2 rounded-md" onClick={() => navigate(userRole === "super-admin" ? "/courses_management" : "/courses")}>
        My courses
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="notifications" icon={<BellFilled />} className="hover:bg-gray-100 p-2 rounded-md" onClick={() => navigate(userRole === "super-admin" ? "/notification" : "/notification")}>
        Notifications
      </Menu.Item>
      <Menu.Divider />
      <p className="text-center text-xs opacity-40">A product of ScriptyLabs</p>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger className="hover:bg-red-100 p-2 rounded-md">
        Logout
      </Menu.Item>
    </Menu>
  );
  const menuNotifications = (
    <Card className="w-80 shadow-lg rounded-lg border border-gray-200">
      <h4 className="text-lg font-bold p-4 border-b">Notifications</h4>
      <div className="max-h-60 overflow-y-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-3 hover:bg-gray-100 transition-all border-b last:border-b-0"
          >
            <p className="text-gray-700 font-medium">{notif.message}</p>
            <p className="text-xs text-gray-500">{notif.date}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t text-center">
        <Button type="link" className="text-blue-500" onClick={() => navigate("/notification")}>See all notifications</Button>
      </div>
    </Card>
  );
  return (
    <div className="flex items-center space-x-6 text-white">
      <Dropdown overlay={menuNotifications} trigger={["click"]} placement="bottom" overlayClassName="!rounded-lg">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Badge count={notifications.length} className="cursor-pointer">
          <Button variant="ghost" className="px-2 py-5 hover:bg-gray-200 rounded-full transition-all shadow-md border-none">
            <BellOutlined className="text-2xl text-gray-700" />
          </Button>
        </Badge>
      </motion.div>
      </Dropdown>
      <Dropdown overlay={menuProfile} trigger={["click"]} placement="bottom" overlayClassName="!rounded-lg">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" className="flex items-center gap-2 py-5 px-2 rounded-lg transition-all border-none">
            <img src="https://i.pravatar.cc/40" alt="User" className="rounded-full h-[30px] w-[30px] border-none" />
            <span className="hidden md:inline font-medium text-gray-700">Mu Baptiste</span>
          </Button>
        </motion.div>
      </Dropdown>
    </div>
  );
};

export default NotificationPanel;
