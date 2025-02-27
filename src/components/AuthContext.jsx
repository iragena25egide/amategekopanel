import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useAuth } from './AuthContext';
import './auth.css'; // For transitions

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = () => setIsLogin((prev) => !prev);

  const handleLoginSuccess = (role) => {
    login(role); // Update auth context
    navigate('/home'); // Redirect to home after login
  };

  return (
    <div className="auth-container">
      <SwitchTransition>
        <CSSTransition key={isLogin ? 'login' : 'register'} timeout={300} classNames="fade">
          <div>
            {isLogin ? (
              <LoginForm onSwitch={handleSwitch} onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Register onSwitch={handleSwitch} />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default AuthContainer;
