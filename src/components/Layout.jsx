import React, { useState, useEffect } from 'react';
import { PlusCircle, SquaresFour, Users, ClockCounterClockwise, Gear, ChartLine, FolderOpen, BookOpen } from '@phosphor-icons/react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logoTransparent from '../assets/logo_transparent.png';
import './Layout.css';

const Layout = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { icon: <SquaresFour />, label: '仪表盘', path: '/dashboard' },
    { icon: <Users />, label: '智能体团队', path: '/agents' },
    { icon: <FolderOpen />, label: '项目', path: '/projects' },
    { icon: <ChartLine />, label: '数据分析', path: '/analytics' },
    { icon: <ClockCounterClockwise />, label: '历史记录', path: '/history' },
    { icon: <BookOpen />, label: '操作手册', path: '/manual' },
  ];

  return (
    <div className="layout-container">
      {/* 动态网格背景 */}
      <div className="bg-grid-pattern"></div>

      {/* 聚光灯效果 */}
      <div
        className="spotlight"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          opacity: opacity
        }}
      ></div>

      {/* 侧边栏 */}
      <aside className="sidebar">
        <div 
          className="sidebar-header" 
          onClick={() => navigate('/homepage')} 
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/homepage');
            }
          }}
        >
          <div className="logo-container">
            <img src={logoTransparent} alt="Nexus" className="logo-image" />
          </div>
          <span className="logo-text">Nexus</span>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => navigate('/dashboard')}
            className="create-button"
          >
            <PlusCircle weight="bold" size={18} className="create-button-icon" />
            <span className="create-button-text">创建项目</span>
          </button>

          <div className="nav-spacer"></div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-item-icon">
                {React.cloneElement(item.icon, { weight: location.pathname === item.path ? "fill" : "regular" })}
              </span>
              <span className="nav-item-text">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 底部用户及设置区 */}
        <div className="sidebar-footer">
          <Link
            to="/settings"
            className={`settings-link ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <Gear size={18} weight={location.pathname === '/settings' ? "fill" : "regular"} />
            <span className="settings-link-text">设置</span>
          </Link>

          <div 
            className="user-profile"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            <div className="user-avatar">
              <div className="user-avatar-circle">
                张
              </div>
              <div className="user-status"></div>
            </div>
            <div className="user-info">
              <p className="user-name">张恒基</p>
              <p className="user-workspace">专业工作区</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区域 */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;