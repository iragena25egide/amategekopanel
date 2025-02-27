import React, { useState } from 'react'; // ✅ Correctly import useState
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import LoginForm from './LoginForm';
import Register from './Register';
import './auth.css'; // For transitions



const AuthContainer = ({ setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin((prev) => !prev);

  return (
    <div className="auth-container">
      <SwitchTransition>
        <CSSTransition
          key={isLogin ? 'login' : 'register'}
          timeout={300}
          classNames="fade"
        >
          <div>
            {isLogin ? (
              <LoginForm onSwitch={handleSwitch} setUserRole={setUserRole} /> 
            ) : (
              <Register onSwitch={handleSwitch} setUserRole={setUserRole} /> 
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default AuthContainer;
