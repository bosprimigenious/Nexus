import React, { useState } from 'react';
import { Brain, Check, Key, MaskHappy, WarningCircle, CaretDown, Eye, EyeSlash, Globe, Bell, Shield } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';
import './Settings.css';

const Settings = () => {
  const { language, setLanguage, theme, setTheme } = useApp();
  const [showApiKey, setShowApiKey] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [primaryModel, setPrimaryModel] = useState('GPT-4o');
  const [reasoningEffort, setReasoningEffort] = useState('Balanced');

  const handleSave = () => {
    console.log('保存设置');
  };

  return (
    <div className="settings-container">
      {/* 顶部标题栏 */}
      <header className="settings-header">
        <div className="settings-header-left">
          <h1>配置</h1>
          <p>管理您的模型参数和API密钥</p>
        </div>
        <button className="save-button" onClick={handleSave}>
          <Check weight="bold" size={16} />
          保存更改
        </button>
      </header>

      {/* 设置内容区 */}
      <div className="settings-content">
        <div className="settings-inner">
          
          {/* 模型智能配置卡片 */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgb(219, 234, 254)', color: 'rgb(37, 99, 235)' }}>
                <Brain weight="fill" size={18} />
              </div>
              <h2 className="section-title">模型智能</h2>
            </div>

            <div className="settings-form">
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">主要模型</label>
                  <div className="form-select-wrapper">
                    <select 
                      className="form-select"
                      value={primaryModel}
                      onChange={(e) => setPrimaryModel(e.target.value)}
                    >
                      <option>GPT-4o (OpenAI)</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>DeepSeek-V3</option>
                      <option>Gemini Pro</option>
                    </select>
                    <CaretDown className="form-select-arrow" size={16} />
                  </div>
                </div>
                
                <div className="form-field">
                  <label className="form-label">推理强度</label>
                  <div className="form-select-wrapper">
                    <select 
                      className="form-select"
                      value={reasoningEffort}
                      onChange={(e) => setReasoningEffort(e.target.value)}
                    >
                      <option>高（详细）</option>
                      <option>平衡</option>
                      <option>低（快速）</option>
                    </select>
                    <CaretDown className="form-select-arrow" size={16} />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">API密钥</label>
                <div className="form-input-wrapper">
                  <Key className="form-input-icon" size={16} />
                  <input 
                    type={showApiKey ? "text" : "password"} 
                    defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx" 
                    className="form-input"
                  />
                  <button 
                    className="form-input-toggle"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeSlash size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* 创造力滑块 */}
              <div className="form-field">
                <div className="slider-container">
                  <div className="slider-header">
                    <label className="form-label">创造力（温度）</label>
                    <span className="slider-value">{temperature}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.1" 
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="slider-input"
                  />
                  <div className="slider-labels">
                    <span>精确</span>
                    <span>平衡</span>
                    <span>创意</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Persona 设置卡片 */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgb(243, 232, 255)', color: 'rgb(147, 51, 234)' }}>
                <MaskHappy weight="fill" size={18} />
              </div>
              <h2 className="section-title">智能体角色</h2>
            </div>
            <div className="form-field">
              <label className="form-label">系统指令</label>
              <textarea 
                rows="4" 
                className="form-textarea"
                defaultValue="您是Nexus，一个专注于编程和数据分析的有用AI助手..."
              ></textarea>
            </div>
          </section>

          {/* 界面设置 */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgb(254, 243, 199)', color: 'rgb(217, 119, 6)' }}>
                <Globe weight="fill" size={18} />
              </div>
              <h2 className="section-title">界面设置</h2>
            </div>
            <div className="form-field">
              <label className="form-label">语言</label>
              <div className="form-select-wrapper">
                <select 
                  className="form-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                </select>
                <CaretDown className="form-select-arrow" size={16} />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">主题</label>
              <div className="form-select-wrapper">
                <select 
                  className="form-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">浅色</option>
                  <option value="auto">自动（浅色）</option>
                </select>
                <CaretDown className="form-select-arrow" size={16} />
              </div>
            </div>
          </section>

          {/* 通知设置 */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgb(219, 234, 254)', color: 'rgb(59, 130, 246)' }}>
                <Bell weight="fill" size={18} />
              </div>
              <h2 className="section-title">通知设置</h2>
            </div>
            <div className="form-field">
              <label className="form-label">邮件通知</label>
              <div className="form-select-wrapper">
                <select className="form-select">
                  <option>启用</option>
                  <option>禁用</option>
                </select>
                <CaretDown className="form-select-arrow" size={16} />
              </div>
            </div>
          </section>

          {/* 安全设置 */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgb(254, 226, 226)', color: 'rgb(239, 68, 68)' }}>
                <Shield weight="fill" size={18} />
              </div>
              <h2 className="section-title">安全设置</h2>
            </div>
            <div className="form-field">
              <label className="form-label">双因素认证</label>
              <div className="form-select-wrapper">
                <select className="form-select">
                  <option>未启用</option>
                  <option>启用</option>
                </select>
                <CaretDown className="form-select-arrow" size={16} />
              </div>
            </div>
          </section>

          {/* 危险区域 */}
          <section className="danger-zone">
            <h2 className="danger-zone-header">
              <WarningCircle weight="bold" size={18} /> 危险区域
            </h2>
            <div className="danger-zone-content">
              <div className="danger-zone-info">
                <h3>清除所有聊天历史</h3>
                <p>此操作无法撤销。</p>
              </div>
              <button 
                className="danger-button"
                onClick={() => {
                  if (window.confirm('确定要删除所有聊天历史吗？此操作无法撤销。')) {
                    console.log('删除所有数据');
                  }
                }}
              >
                删除数据
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;