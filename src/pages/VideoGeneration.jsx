import React, { useState } from 'react';
import { FilmStrip, Play, Upload, Download, Gear, X } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import './VideoGeneration.css';

const VideoGeneration = () => {
  const navigate = useNavigate();
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (event) => {
        setScript(event.target?.result || '');
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = () => {
    if (!script.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    
    // 模拟生成进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="video-generation-container">
      <header className="video-header">
        <div className="video-header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            <X size={20} />
          </button>
          <div className="video-header-title">
            <FilmStrip weight="fill" size={24} className="video-header-icon" />
            <h1>视频生成</h1>
          </div>
        </div>
        <div className="video-header-actions">
          <button 
            className="header-action-button"
            onClick={() => navigate('/settings')}
          >
            <Gear size={18} />
          </button>
        </div>
      </header>

      <div className="video-content">
        <div className="video-main-panel">
          <div className="script-editor">
            <div className="editor-header">
              <span className="editor-title">脚本编辑器</span>
              <div className="editor-actions">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button 
                  className="editor-button"
                  onClick={handleFileUpload}
                >
                  <Upload size={16} />
                  {uploadedFile ? uploadedFile.name : '导入脚本'}
                </button>
              </div>
            </div>
            <textarea
              className="script-textarea"
              placeholder="在此输入您的视频脚本...&#10;&#10;示例：&#10;场景1：城市夜景，霓虹灯闪烁&#10;场景2：人物行走在街道上&#10;场景3：镜头拉近，展示细节"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
            <div className="editor-footer">
              <div className="script-stats">
                <span>字数: {script.length}</span>
                <span>预计时长: {Math.ceil(script.length / 10)}秒</span>
              </div>
              <button 
                className="generate-button"
                onClick={handleGenerate}
                disabled={!script.trim() || isGenerating}
              >
                <Play weight="fill" size={18} />
                {isGenerating ? '生成中...' : '开始生成'}
              </button>
            </div>
          </div>

          {isGenerating && (
            <div className="progress-panel">
              <div className="progress-header">
                <span>生成进度</span>
                <span className="progress-percent">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                <div className={`progress-step ${progress > 0 ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <span>解析脚本</span>
                </div>
                <div className={`progress-step ${progress > 33 ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <span>渲染场景</span>
                </div>
                <div className={`progress-step ${progress > 66 ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <span>合成视频</span>
                </div>
                <div className={`progress-step ${progress === 100 ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <span>完成</span>
                </div>
              </div>
            </div>
          )}

          {!isGenerating && progress === 100 && (
            <div className="result-panel">
              <div className="result-header">
                <span>生成完成</span>
                <button className="download-button">
                  <Download size={18} />
                  下载视频
                </button>
              </div>
              <div className="video-preview">
                <div className="preview-placeholder">
                  <Play weight="fill" size={48} />
                  <span>视频预览</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="video-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">参数设置</h3>
            <div className="setting-item">
              <label>分辨率</label>
              <select className="setting-select">
                <option>1920x1080 (Full HD)</option>
                <option>1280x720 (HD)</option>
                <option>3840x2160 (4K)</option>
              </select>
            </div>
            <div className="setting-item">
              <label>帧率</label>
              <select className="setting-select">
                <option>24 fps</option>
                <option>30 fps</option>
                <option>60 fps</option>
              </select>
            </div>
            <div className="setting-item">
              <label>风格</label>
              <select className="setting-select">
                <option>写实</option>
                <option>卡通</option>
                <option>赛博朋克</option>
                <option>简约</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">历史记录</h3>
            <div className="history-list">
              <div className="history-item">
                <div className="history-thumbnail"></div>
                <div className="history-info">
                  <span className="history-name">城市夜景视频</span>
                  <span className="history-time">2小时前</span>
                </div>
              </div>
              <div className="history-item">
                <div className="history-thumbnail"></div>
                <div className="history-info">
                  <span className="history-name">产品宣传片</span>
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

export default VideoGeneration;
