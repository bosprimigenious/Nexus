import React, { useState } from 'react';
import { PaintBrush, X, Upload, Download, Gear, Palette, Stack, Code } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import './UIDesign.css';

const UIDesign = () => {
  const navigate = useNavigate();
  const [designPrompt, setDesignPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('现代简约');

  const styles = [
    { name: '现代简约', color: 'rgb(37, 99, 235)' },
    { name: '商务专业', color: 'rgb(71, 85, 105)' },
    { name: '活泼创意', color: 'rgb(249, 115, 22)' },
    { name: '优雅高端', color: 'rgb(147, 51, 234)' },
  ];

  return (
    <div className="ui-design-container">
      <header className="design-header">
        <div className="design-header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            <X size={20} />
          </button>
          <div className="design-header-title">
            <PaintBrush weight="fill" size={24} className="design-header-icon" />
            <h1>UI/UX设计</h1>
          </div>
        </div>
        <div className="design-header-actions">
          <button 
            className="header-action-button"
            onClick={() => navigate('/settings')}
          >
            <Gear size={18} />
          </button>
        </div>
      </header>

      <div className="design-content">
        <div className="design-main-panel">
          <div className="prompt-section">
            <div className="prompt-header">
              <span className="prompt-title">设计需求</span>
            </div>
            <textarea
              className="prompt-textarea"
              placeholder="描述您想要设计的界面...&#10;&#10;例如：&#10;设计一个电商网站的首页，包含导航栏、轮播图、商品展示区域和底部信息栏。风格要求现代简约，主色调为蓝色。"
              value={designPrompt}
              onChange={(e) => setDesignPrompt(e.target.value)}
            />
            <div className="prompt-footer">
              <button className="generate-design-button">
                <Palette weight="fill" size={18} />
                生成设计
              </button>
            </div>
          </div>

          <div className="style-selector">
            <h3 className="selector-title">设计风格</h3>
            <div className="style-grid">
              {styles.map((style) => (
                <button
                  key={style.name}
                  className={`style-card ${selectedStyle === style.name ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.name)}
                  style={{ borderColor: selectedStyle === style.name ? style.color : 'transparent' }}
                >
                  <div 
                    className="style-color"
                    style={{ background: style.color }}
                  ></div>
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="design-preview">
            <div className="preview-header">
              <span>设计预览</span>
              <div className="preview-actions">
                <button className="preview-action-button">
                  <Code size={16} />
                  查看代码
                </button>
                <button className="preview-action-button">
                  <Download size={16} />
                  导出设计
                </button>
              </div>
            </div>
            <div className="preview-canvas">
              <div className="canvas-placeholder">
                <Stack size={48} />
                <span>设计预览区域</span>
                <p>输入设计需求并点击生成设计</p>
              </div>
            </div>
          </div>
        </div>

        <div className="design-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">组件库</h3>
            <div className="component-list">
              <div className="component-item">
                <Stack size={18} />
                <span>导航栏</span>
              </div>
              <div className="component-item">
                <Stack size={18} />
                <span>按钮</span>
              </div>
              <div className="component-item">
                <Stack size={18} />
                <span>卡片</span>
              </div>
              <div className="component-item">
                <Stack size={18} />
                <span>表单</span>
              </div>
              <div className="component-item">
                <Stack size={18} />
                <span>模态框</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">最近设计</h3>
            <div className="design-history">
              <div className="history-item">
                <div className="history-preview"></div>
                <div className="history-info">
                  <span className="history-name">电商首页</span>
                  <span className="history-time">3小时前</span>
                </div>
              </div>
              <div className="history-item">
                <div className="history-preview"></div>
                <div className="history-info">
                  <span className="history-name">登录页面</span>
                  <span className="history-time">1天前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIDesign;
