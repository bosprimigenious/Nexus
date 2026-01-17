import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash, Key, User } from '@phosphor-icons/react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('登录:', formData.username, formData.password);
      navigate('/');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }
      console.log('注册:', formData);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">{isLogin ? '登录' : '注册'}</h1>
          <p className="login-subtitle">
            {isLogin ? '欢迎回到 Nexus' : '创建您的 Nexus 账户'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">邮箱</label>
              <div className="form-input-wrapper">
                <User className="form-input-icon" size={16} />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">用户名</label>
            <div className="form-input-wrapper">
              <User className="form-input-icon" size={16} />
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">密码</label>
            <div className="form-input-wrapper">
              <Key className="form-input-icon" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="请输入密码"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="form-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">确认密码</label>
              <div className="form-input-wrapper">
                <Key className="form-input-icon" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-input"
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <button type="submit" className="login-submit-button">
            {isLogin ? '登录' : '注册'}
          </button>
        </form>

        <div className="login-footer">
          <button
            className="login-switch-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '还没有账户？立即注册' : '已有账户？立即登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
