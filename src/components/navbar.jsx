import React from 'react';
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Header style={{ backgroundColor: '#1890ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Logo or Title */}
      <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>AMATEGEKO PANEL</div>

      {/* Right Side Buttons */}
      <div>
        <Button style={{ marginRight: '10px', backgroundColor: "#1890ff", borderWidth: 1, borderColor: "#fff", color: "white" }}>
          Login
        </Button>
        <Button style={{ marginRight: '10px', backgroundColor: "#1890ff", borderWidth: 1, borderColor: "#fff", color: "white" }}>
          Register
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
