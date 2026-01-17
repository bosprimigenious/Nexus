import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Check, Play, Plus, ArrowUp, 
  Export, Sidebar, Copy, Lightning,
  TerminalWindow, X, Paperclip, Microphone
} from '@phosphor-icons/react';
import logoCircle from '../assets/logo_circle.png';
import './Example.css';

const Example = () => {
  const scrollRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('发送消息:', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="example-container">
      {/* 左侧主要交互区 */}
      <div className={`example-main ${showPreview ? 'with-preview' : ''}`}>
        {/* Header */}
        <header className="example-header">
          <div className="example-header-left">
            <h1 className="example-header-title">操作示例：霓虹东京开场</h1>
            <span className="example-status-badge">
              <span className="example-status-dot"></span>
              运行中
            </span>
          </div>
          <div className="example-header-actions">
            <button className="example-header-button" title="导出">
              <Export size={18} />
            </button>
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={`example-header-button ${showPreview ? 'active' : ''}`}
              title="预览面板"
            >
              <Sidebar size={18} />
            </button>
          </div>
        </header>

        {/* 聊天内容流 */}
        <div ref={scrollRef} className="example-chat-content">
          {/* 默认示例消息 */}
          <div className="example-message-user">
            <div className="example-message-avatar example-message-avatar-user">
              <span className="example-message-avatar-text">张</span>
            </div>
            <div className="example-message-bubble">
              生成一个高端的电影级雨天街道预览。
            </div>
          </div>

          {/* AI 响应卡片 */}
          <div className="example-message-ai">
            <div className="example-message-avatar example-message-avatar-ai">
              <img src={logoCircle} alt="AI" className="example-ai-avatar-image" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="example-ai-planning">
                <div className="example-planning-header">
                  <Brain style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} size={14} />
                  编排器规划
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="example-planning-item">
                    <Check weight="bold" className="example-planning-check" size={14} />
                    <span>脚本模拟已准备执行。</span>
                  </div>
                </div>
              </div>

              {/* 脚本卡片 */}
              <div className="example-code-card">
                <div className="example-code-header">
                  <span className="example-code-filename">scene_runner.sh</span>
                  <div className="example-code-actions">
                    <button 
                      onClick={() => setShowPreview(!showPreview)}
                      className="example-code-action-button"
                    >
                      <Play size={12} weight="fill" /> 运行预览
                    </button>
                    <button className="example-code-action-button secondary">
                      <Copy size={12}/> 复制
                    </button>
                  </div>
                </div>
                <div className="example-code-body">
                  <div className="example-code-line">
                    <span className="example-code-line-number">01</span>
                    <span># 初始化赛博朋克环境</span>
                  </div>
                  <div className="example-code-line">
                    <span className="example-code-line-number">02</span>
                    <span>render --scene "neon_city" --weather "heavy_rain"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部输入框 */}
        <div className="example-input-section">
          <div className="example-input-container-simple">
            <button className="example-input-add-button-simple">
              <Paperclip size={20} />
            </button>
            <input 
              type="text"
              className="example-input-simple"
              placeholder="有问题，尽管问"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              className="example-input-send-button-simple"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              {inputValue.trim() ? (
                <ArrowUp weight="bold" size={20} />
              ) : (
                <Microphone size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 右侧实时预览面板 */}
      <aside className={`example-preview-panel ${showPreview ? '' : 'hidden'}`}>
        <div className="example-preview-header">
          <div className="example-preview-header-left">
            <TerminalWindow size={18} className="example-preview-header-icon" weight="fill" />
            <span className="example-preview-header-title">实时执行</span>
          </div>
          <button 
            onClick={() => setShowPreview(false)} 
            className="example-preview-close-button"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
        
        <div className="example-preview-content">
          <p className="example-preview-line">{'>'} 正在初始化沙盒环境...</p>
          <p className="example-preview-line">{'>'} 注入场景资源: [rain_texture_v2]</p>
          <p className="example-preview-line">{'>'} 编译着色器...</p>
          <p className="example-preview-line-active">
            <span className="example-preview-ping"></span>
            {'>'} [成功] 场景 "新东京" 已渲染。
          </p>
          
          <div className="example-preview-simulation">
            <div className="example-preview-simulation-bg">
              <Lightning size={40} weight="fill" />
            </div>
            <div className="example-preview-simulation-header">
              <Lightning weight="fill" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} size={16} /> 活动模拟
            </div>
            <p className="example-preview-simulation-text">
              "雨滴在霓虹灯闪烁中闪闪发光，24fps。湿路面上的反射实时更新。"
            </p>
          </div>
          
          <div className="example-preview-metrics">
            <p className="example-preview-metrics-title">系统指标</p>
            <div className="example-preview-metric">
              <span>显存使用</span>
              <span>4.2 GB</span>
            </div>
            <div className="example-preview-metric">
              <span>帧时间</span>
              <span>12.4ms</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Example;
