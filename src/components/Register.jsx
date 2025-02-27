import React from 'react';
import { Form, Input, Button, Card, Typography, Select, message } from 'antd';

const { Text } = Typography;
const { Option } = Select;

const Register = ({ onSwitch }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Register submitted:', values);
    message.success('Registration successful!');
    form.resetFields(); // Clear form after submission
  };

  return (
    <Card
      title="Register"
      style={{
        width: 400,
        margin: '50px auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Username Field */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* Role Selector */}
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="sub-admin">Sub Admin</Option>
            <Option value="super-admin">Super Admin</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>

        {/* Sign In Link */}
        <Text>
          Already have an account?{' '}
          <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={onSwitch}>
            Sign In
          </span>
        </Text>
      </Form>
    </Card>
  );
};

export default Register;
