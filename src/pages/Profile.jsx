import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Check } from '@phosphor-icons/react';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('张恒基');
  const [userEmail, setUserEmail] = useState('zhanghengji@example.com');
  const [userWorkspace, setUserWorkspace] = useState('专业工作区');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    console.log('保存用户信息');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <button 
          className="profile-back-button"
          onClick={() => navigate(-1)}
        >
          <X size={20} />
        </button>
        <h1 className="profile-title">用户信息</h1>
        {isEditing && (
          <button 
            className="profile-save-button"
            onClick={handleSave}
          >
            <Check size={18} weight="bold" />
            保存
          </button>
        )}
      </header>

      <div className="profile-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              张
            </div>
            <button className="profile-avatar-edit">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="profile-name">{userName}</h2>
          <p className="profile-email">{userEmail}</p>
        </div>

        <div className="profile-form-section">
          <div className="profile-form-group">
            <label className="profile-form-label">用户名</label>
            {isEditing ? (
              <input
                type="text"
                className="profile-form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            ) : (
              <div className="profile-form-value">{userName}</div>
            )}
          </div>

          <div className="profile-form-group">
            <label className="profile-form-label">邮箱</label>
            {isEditing ? (
              <input
                type="email"
                className="profile-form-input"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            ) : (
              <div className="profile-form-value">{userEmail}</div>
            )}
          </div>

          <div className="profile-form-group">
            <label className="profile-form-label">工作区</label>
            {isEditing ? (
              <input
                type="text"
                className="profile-form-input"
                value={userWorkspace}
                onChange={(e) => setUserWorkspace(e.target.value)}
              />
            ) : (
              <div className="profile-form-value">{userWorkspace}</div>
            )}
          </div>

          {!isEditing && (
            <button 
              className="profile-edit-button"
              onClick={() => setIsEditing(true)}
            >
              编辑信息
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
