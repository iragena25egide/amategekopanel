import React from 'react';
import { Form, Input, Button, Card, Checkbox, Typography, Select } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const { Link, Text } = Typography;
const { Option } = Select;

const LoginForm = ({ onSwitch, setUserRole }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username, password, role } = values;

    if (username === 'dalton' && password === '11111') {
      setUserRole(role);

      Swal.fire({
        icon: 'success',
        title: 'Successfully Logged In',
        text: `Welcome back, ${username}!`,
        width: '500px',
        padding: '20px',
        background: '#e6ffe6',
        color: '#2e7d32',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#4CAF50',
      }).then((result) => {
        if (result.isConfirmed) {
          if (role === 'sub-admin') {
            navigate('/home');
          } else if (role === 'super-admin') {
            navigate('/home');
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Incorrect username or password.',
        width: '500px',
        padding: '20px',
        background: '#ffe6e6',
        color: '#c62828',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#e53935',
      });
    }
  };

  return (
    <Card
      title="Login"
      style={{
        width: 400,
        margin: '60px auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="sub-admin">Sub Admin</Option>
            <Option value="super-admin">Super Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link href="#">Forgot password?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <Text>
        Don’t have an account?{' '}
        <span
       style={{ color: '#1890ff', cursor: 'pointer' }}
        onClick={onSwitch} // ✅ Add onClick to switch to Register
          >
       Register Now
       </span>
</Text>

      </Form>
    </Card>
  );
};

export default LoginForm;
