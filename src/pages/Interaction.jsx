import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Brain, Check, Play, Plus, ArrowUp, 
  Share, Sidebar, Copy, Aperture, Lightning,
  TerminalWindow, X, Paperclip, Microphone
} from '@phosphor-icons/react';
import logoCircle from '../assets/logo_circle.png';
import './Interaction.css';

const Interaction = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    // 如果有从Dashboard传递的初始消息，添加到消息列表
    if (location.state?.initialMessage) {
      const initialMsg = location.state.initialMessage;
      // 使用 setTimeout 避免在 effect 中同步调用 setState
      setTimeout(() => {
      setMessages([{
        id: 1,
        type: 'user',
        content: initialMsg,
        timestamp: new Date()
      }]);
      }, 0);
      // 清空location state，避免刷新时重复添加
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue.trim(),
        timestamp: new Date()
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');
      
      // 模拟AI响应
      setTimeout(() => {
        const aiResponse = {
          id: updatedMessages.length + 1,
          type: 'ai',
          content: '收到您的消息，正在处理...',
          timestamp: new Date()
        };
        setMessages(prev => {
          const newMessages = [...prev, aiResponse];
          // 自动对话一轮后弹出注册
          if (newMessages.length === 2 && newMessages.filter(m => m.type === 'user').length === 1) {
            setTimeout(() => {
              if (window.confirm('检测到您还未注册，是否前往注册页面？')) {
                window.location.href = '/login';
              }
            }, 500);
          }
          return newMessages;
        });
      }, 1000);
    }
  };

  const handleMicrophoneClick = async () => {
    if (isRecording) {
      // 停止录音
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // 开始录音
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          console.log('录音完成，音频大小:', blob.size);
          // 这里可以处理录音文件，比如转换为文本
          // 暂时显示一个提示
          alert('录音完成！音频已保存。');
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('无法访问麦克风:', error);
        alert('无法访问麦克风，请检查权限设置');
      }
    }
  };

  const handleShare = () => {
    // 复制当前对话链接
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('对话链接已复制到剪贴板！');
    }).catch((error) => {
      console.error('复制失败:', error);
      // 降级方案：使用prompt显示链接
      prompt('请复制以下链接:', currentUrl);
    });
  };

  return (
    <div className="interaction-container">
      {/* 左侧主要交互区 */}
      <div className={`interaction-main ${showPreview ? 'with-preview' : ''}`}>
        {/* Header */}
        <header className="interaction-header">
          <div className="header-left">
            <h1 className="header-title">项目：霓虹东京开场</h1>
            <span className="status-badge">
              <span className="status-dot"></span>
              运行中
            </span>
          </div>
          <div className="header-actions">
            <button 
              className="header-button" 
              title="分享对话链接"
              onClick={handleShare}
            >
              <Share size={18} />
            </button>
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={`header-button ${showPreview ? 'active' : ''}`}
              title="预览面板"
            >
              <Sidebar size={18} />
            </button>
          </div>
        </header>

        {/* 聊天内容流 */}
        <div ref={scrollRef} className="chat-content">
          {messages.length === 0 ? (
            <>
              {/* 默认示例消息 */}
              <div className="message-user">
                <div className="message-avatar message-avatar-user">
                  <span className="message-avatar-text">张</span>
                </div>
                <div className="message-bubble">
                  生成一个高端的电影级雨天街道预览。
                </div>
              </div>

              {/* AI 响应卡片 */}
              <div className="message-ai">
                <div className="message-avatar message-avatar-ai">
                  <img src={logoCircle} alt="AI" className="ai-avatar-image" />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="ai-planning">
                    <div className="planning-header">
                      <Brain style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} size={14} />
                      编排器规划
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="planning-item">
                        <Check weight="bold" className="planning-check" size={14} />
                        <span>脚本模拟已准备执行。</span>
                      </div>
                    </div>
                  </div>

                  {/* 脚本卡片 */}
                  <div className="code-card">
                    <div className="code-header">
                      <span className="code-filename">scene_runner.sh</span>
                      <div className="code-actions">
                        <button 
                          onClick={() => setShowPreview(!showPreview)}
                          className="code-action-button"
                        >
                          <Play size={12} weight="fill" /> 运行预览
                        </button>
                        <button className="code-action-button secondary">
                          <Copy size={12}/> 复制
                        </button>
                      </div>
                    </div>
                    <div className="code-body">
                      <div className="code-line">
                        <span className="code-line-number">01</span>
                        <span># 初始化赛博朋克环境</span>
                      </div>
                      <div className="code-line">
                        <span className="code-line-number">02</span>
                        <span>render --scene "neon_city" --weather "heavy_rain"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            messages.map((msg) => (
              msg.type === 'user' ? (
                <div key={msg.id} className="message-user">
                  <div className="message-avatar message-avatar-user">
                    <span className="message-avatar-text">张</span>
                  </div>
                  <div className="message-bubble">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="message-ai">
                  <div className="message-avatar message-avatar-ai">
                    <img src={logoCircle} alt="AI" className="ai-avatar-image" />
                  </div>
                  <div className="message-bubble">
                    {msg.content}
                  </div>
                </div>
              )
            ))
          )}
        </div>

        {/* 底部输入框 */}
        <div className="input-section">
          <div className="input-container-simple">
            <button className="input-add-button-simple">
              <Paperclip size={20} />
            </button>
            <input 
              type="text"
              className="input-simple"
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
              className="input-send-button-simple"
              onClick={inputValue.trim() ? handleSend : handleMicrophoneClick}
              disabled={!inputValue.trim() && !isRecording}
              style={isRecording ? { color: 'rgb(239, 68, 68)' } : {}}
              title={isRecording ? '停止录音' : inputValue.trim() ? '发送' : '开始录音'}
            >
              {inputValue.trim() ? (
                <ArrowUp weight="bold" size={20} />
              ) : (
                <Microphone size={20} weight={isRecording ? 'fill' : 'regular'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 右侧实时预览面板 */}
      <aside className={`preview-panel ${showPreview ? '' : 'hidden'}`}>
        <div className="preview-header">
          <div className="preview-header-left">
            <TerminalWindow size={18} className="preview-header-icon" weight="fill" />
            <span className="preview-header-title">实时执行</span>
          </div>
          <button 
            onClick={() => setShowPreview(false)} 
            className="preview-close-button"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
        
        <div className="preview-content">
          <p className="preview-line">{'>'} 正在初始化沙盒环境...</p>
          <p className="preview-line">{'>'} 注入场景资源: [rain_texture_v2]</p>
          <p className="preview-line">{'>'} 编译着色器...</p>
          <p className="preview-line-active">
            <span className="preview-ping"></span>
            {'>'} [成功] 场景 "新东京" 已渲染。
          </p>
          
          <div className="preview-simulation">
            <div className="preview-simulation-bg">
              <Lightning size={40} weight="fill" />
            </div>
            <div className="preview-simulation-header">
              <Lightning weight="fill" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} size={16} /> 活动模拟
            </div>
            <p className="preview-simulation-text">
              "雨滴在霓虹灯闪烁中闪闪发光，24fps。湿路面上的反射实时更新。"
            </p>
          </div>
          
          <div className="preview-metrics">
            <p className="preview-metrics-title">系统指标</p>
            <div className="preview-metric">
              <span>显存使用</span>
              <span>4.2 GB</span>
            </div>
            <div className="preview-metric">
              <span>帧时间</span>
              <span>12.4ms</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Interaction;