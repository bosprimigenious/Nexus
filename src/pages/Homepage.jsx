import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, CaretLeft, CaretRight, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import logoTransparent from '../assets/logo_transparent.png';
import test1Video from '../assets/test1.mp4';
import test2Video from '../assets/test2.mp4';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const videos = [test1Video, test2Video];

  useEffect(() => {
    // 自动播放当前视频
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.log('视频自动播放失败:', error);
      });
    }
  }, [currentVideoIndex, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // 当前视频播放完毕，切换到下一个
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex, videos.length]);

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="homepage-container">
      {/* 导航栏 */}
      <nav className="homepage-nav">
        <div className="homepage-nav-content">
          <div className="homepage-nav-left">
            <div className="homepage-logo-box">
              <img src={logoTransparent} alt="Nexus" className="homepage-logo-img" />
            </div>
            <span className="homepage-nav-title">NEXUS</span>
          </div>
          
          <div className="homepage-nav-right">
            <span className="homepage-status-tag">
              <span className="homepage-status-dot"></span>
              系统就绪
            </span>
            <button 
              className="homepage-start-button"
              onClick={() => navigate('/dashboard')}
            >
              开始创作
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <div className="homepage-hero-left">
            <h1 className="homepage-hero-title">
              重塑 <span className="homepage-hero-highlight">智造</span> 边界
            </h1>
            <p className="homepage-hero-subtitle">
              Nexus Engine V4.0.2: 专业的 AIGC 视频全流程辅助系统。基于 LangGraph 与 ACPs 协议，将创意构思秒级转化为高质量视频。
            </p>
            <div className="homepage-hero-actions">
              <button 
                className="homepage-button-primary"
                onClick={() => navigate('/dashboard')}
              >
                免费试用
              </button>
              <button 
                className="homepage-button-secondary"
                onClick={() => navigate('/manual')}
              >
                技术文档
              </button>
            </div>
          </div>
          
          <div className="homepage-video-container">
            <video
              ref={videoRef}
              className="homepage-video-bg"
              autoPlay
              muted={isMuted}
              playsInline
              key={currentVideoIndex}
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
            </video>
            <div className="homepage-video-overlay">
              <p className="homepage-video-text">Nexus Engine 实时生成演示</p>
            </div>
            {/* 视频控制按钮 - 左侧 */}
            <button 
              className="homepage-video-control-btn-left"
              onClick={handlePrevVideo}
              aria-label="上一个视频"
            >
              <CaretLeft size={24} weight="bold" />
            </button>
            {/* 视频控制按钮 - 右侧 */}
            <button 
              className="homepage-video-control-btn-right"
              onClick={handleNextVideo}
              aria-label="下一个视频"
            >
              <CaretRight size={24} weight="bold" />
            </button>
            {/* 视频控制按钮 - 底部 */}
            <div className="homepage-video-controls-bottom">
              <div className="homepage-video-indicators">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`homepage-video-indicator ${index === currentVideoIndex ? 'active' : ''}`}
                    onClick={() => setCurrentVideoIndex(index)}
                    aria-label={`切换到视频 ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                className="homepage-video-mute-btn"
                onClick={handleToggleMute}
                aria-label={isMuted ? '开启声音' : '静音'}
              >
                {isMuted ? (
                  <SpeakerSlash size={20} weight="bold" />
                ) : (
                  <SpeakerHigh size={20} weight="bold" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 功能展示 Section */}
      <section className="homepage-features">
        <div className="homepage-features-content">
          <h2 className="homepage-features-title">由智能 Agent 驱动的全流程</h2>
          <div className="homepage-features-grid">
            
            <div className="homepage-feature-card">
              <div className="homepage-feature-bg homepage-feature-bg-1"></div>
              <div className="homepage-feature-overlay">
                <h3 className="homepage-feature-title">导演助手 & 剧本 Writer</h3>
                <p className="homepage-feature-desc">基于 LangGraph 的多智能体协作，自动提炼创意并编写专业剧本。</p>
              </div>
            </div>

            <div className="homepage-feature-card">
              <div className="homepage-feature-bg homepage-feature-bg-2"></div>
              <div className="homepage-feature-overlay">
                <h3 className="homepage-feature-title">智能动画师 Agent</h3>
                <p className="homepage-feature-desc">通过异步任务流，将剧本逻辑无缝转化为高保真视频资产。</p>
              </div>
            </div>

            <div className="homepage-feature-card">
              <div className="homepage-feature-bg homepage-feature-bg-3"></div>
              <div className="homepage-feature-overlay">
                <h3 className="homepage-feature-title">AIP 协议自动化</h3>
                <p className="homepage-feature-desc">采用 ACPs 通信协议，确保创作全流程的自动化体验与数据安全。</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="homepage-footer-content">
          <div className="homepage-footer-tech">
            <span className="homepage-footer-tech-item">Python 3.10+</span>
            <span className="homepage-footer-separator">|</span>
            <span className="homepage-footer-tech-item">LangGraph</span>
            <span className="homepage-footer-separator">|</span>
            <span className="homepage-footer-tech-item">Asyncio</span>
          </div>
          <p className="homepage-footer-copyright">
            © 2026 Nexus Engine. 智能 Agent 视频创作辅助系统.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
