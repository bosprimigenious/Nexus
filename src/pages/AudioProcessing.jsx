import React, { useState } from 'react';
import { MusicNote, X, Play, Pause, Download, Gear, Waveform, Upload } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import './AudioProcessing.css';

const AudioProcessing = () => {
  const navigate = useNavigate();
  const [audioPrompt, setAudioPrompt] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const audioInputRef = React.useRef(null);
  
  // 使用 useState 初始化函数生成波形数据
  const [waveformBars] = useState(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      height: Math.random() * 60 + 20,
      delay: i * 0.05
    }))
  );

  const handleAudioUpload = () => {
    audioInputRef.current?.click();
  };

  const handleAudioChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedAudio(file);
      console.log('上传的音频文件:', file.name);
    }
  };

  const handleGenerate = () => {
    if (!audioPrompt.trim()) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="audio-processing-container">
      <header className="audio-header">
        <div className="audio-header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            <X size={20} />
          </button>
          <div className="audio-header-title">
            <MusicNote weight="fill" size={24} className="audio-header-icon" />
            <h1>音频处理</h1>
          </div>
        </div>
        <div className="audio-header-actions">
          <button 
            className="header-action-button"
            onClick={() => navigate('/settings')}
          >
            <Gear size={18} />
          </button>
        </div>
      </header>

      <div className="audio-content">
        <div className="audio-main-panel">
          <div className="prompt-section">
            <div className="prompt-header">
              <span className="prompt-title">音乐创作需求</span>
            </div>
            <textarea
              className="prompt-textarea"
              placeholder="描述您想要创作的音乐...&#10;&#10;例如：&#10;创作一首轻松愉快的背景音乐，适合咖啡厅场景，风格为爵士乐，时长约2分钟，包含钢琴和萨克斯风"
              value={audioPrompt}
              onChange={(e) => setAudioPrompt(e.target.value)}
            />
            <div className="prompt-footer">
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={handleAudioChange}
              />
              <button 
                className="upload-audio-button"
                onClick={handleAudioUpload}
              >
                <Upload size={18} />
                {uploadedAudio ? uploadedAudio.name : '上传音频'}
              </button>
              <button 
                className="generate-audio-button"
                onClick={handleGenerate}
                disabled={!audioPrompt.trim() || isGenerating}
              >
                <Waveform weight="fill" size={18} />
                {isGenerating ? '生成中...' : '生成音乐'}
              </button>
            </div>
          </div>

          {isGenerating && (
            <div className="generating-panel">
              <div className="generating-content">
                <Waveform weight="fill" size={48} className="generating-icon" />
                <span>正在生成音乐...</span>
                <div className="waveform-animation">
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>
              </div>
            </div>
          )}

          {!isGenerating && (
            <div className="audio-player-section">
              <div className="player-header">
                <span>音频预览</span>
                <div className="player-actions">
                  <button className="player-button">
                    <Download size={18} />
                    下载
                  </button>
                </div>
              </div>
              <div className="audio-player">
                <div className="player-controls">
                  <button 
                    className="play-button"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause weight="fill" size={24} /> : <Play weight="fill" size={24} />}
                  </button>
                  <div className="player-info">
                    <span className="track-name">生成的音乐</span>
                    <span className="track-time">00:00 / 02:30</span>
                  </div>
                </div>
                <div className="waveform-visualizer">
                  <div className="waveform-bars">
                    {waveformBars.map((bar) => (
                      <div 
                        key={bar.id} 
                        className="waveform-bar"
                        style={{ 
                          height: `${bar.height}%`,
                          animationDelay: `${bar.delay}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="audio-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">音乐参数</h3>
            <div className="param-item">
              <label>风格</label>
              <select className="param-select">
                <option>爵士</option>
                <option>电子</option>
                <option>古典</option>
                <option>流行</option>
                <option>摇滚</option>
              </select>
            </div>
            <div className="param-item">
              <label>时长</label>
              <select className="param-select">
                <option>30秒</option>
                <option>1分钟</option>
                <option>2分钟</option>
                <option>5分钟</option>
              </select>
            </div>
            <div className="param-item">
              <label>乐器</label>
              <select className="param-select">
                <option>钢琴</option>
                <option>吉他</option>
                <option>小提琴</option>
                <option>混合</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">最近创作</h3>
            <div className="audio-history">
              <div className="history-item">
                <div className="history-icon">
                  <MusicNote size={20} />
                </div>
                <div className="history-info">
                  <span className="history-name">咖啡厅背景音乐</span>
                  <span className="history-time">4小时前</span>
                </div>
              </div>
              <div className="history-item">
                <div className="history-icon">
                  <MusicNote size={20} />
                </div>
                <div className="history-info">
                  <span className="history-name">电子舞曲</span>
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

export default AudioProcessing;
