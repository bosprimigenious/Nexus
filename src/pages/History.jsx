import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilmStrip, CodeBlock, ChartPolar, Translate, 
  MagnifyingGlass, Faders, Bell, Users, DotsThree, Image, FileText, MusicNote
} from '@phosphor-icons/react';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus] = useState('全部');

  const historyItems = [
    { id: 1, title: '赛博朋克城市开场', icon: <FilmStrip weight="fill" />, status: '生成中', time: '2分钟前', info: '3个智能体', color: 'rgb(219, 234, 254)', textColor: 'rgb(37, 99, 235)', badgeColor: 'rgb(219, 234, 254)', badgeBorder: 'rgb(191, 219, 254)', badgeText: 'rgb(37, 99, 235)' },
    { id: 2, title: 'Python脚本重构', icon: <CodeBlock weight="fill" />, status: '已完成', time: '2小时前', info: 'Python', color: 'rgb(243, 232, 255)', textColor: 'rgb(147, 51, 234)', badgeColor: 'rgb(209, 250, 229)', badgeBorder: 'rgb(167, 243, 208)', badgeText: 'rgb(16, 185, 129)' },
    { id: 3, title: 'Q3财务报告分析', icon: <ChartPolar weight="fill" />, status: '草稿', time: '昨天 14:30', info: 'PDF', color: 'rgb(255, 237, 213)', textColor: 'rgb(249, 115, 22)', badgeColor: 'rgb(241, 245, 249)', badgeBorder: 'rgb(226, 232, 240)', badgeText: 'rgb(100, 116, 139)' },
    { id: 4, title: '合同翻译（中英）', icon: <Translate weight="fill" />, status: '已完成', time: '昨天 09:15', info: '双语', color: 'rgb(209, 250, 229)', textColor: 'rgb(16, 185, 129)', badgeColor: 'rgb(209, 250, 229)', badgeBorder: 'rgb(167, 243, 208)', badgeText: 'rgb(16, 185, 129)' },
    { id: 5, title: '品牌Logo设计', icon: <Image weight="fill" />, status: '已完成', time: '3天前', info: 'AI绘图', color: 'rgb(254, 226, 226)', textColor: 'rgb(239, 68, 68)', badgeColor: 'rgb(209, 250, 229)', badgeBorder: 'rgb(167, 243, 208)', badgeText: 'rgb(16, 185, 129)' },
    { id: 6, title: '技术文档编写', icon: <FileText weight="fill" />, status: '生成中', time: '5小时前', info: 'Markdown', color: 'rgb(229, 231, 235)', textColor: 'rgb(107, 114, 128)', badgeColor: 'rgb(219, 234, 254)', badgeBorder: 'rgb(191, 219, 254)', badgeText: 'rgb(37, 99, 235)' },
    { id: 7, title: '背景音乐生成', icon: <MusicNote weight="fill" />, status: '已完成', time: '1周前', info: '音频', color: 'rgb(243, 232, 255)', textColor: 'rgb(168, 85, 247)', badgeColor: 'rgb(209, 250, 229)', badgeBorder: 'rgb(167, 243, 208)', badgeText: 'rgb(16, 185, 129)' },
  ];

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === '全部' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="history-container">
      {/* Header */}
      <header className="history-header">
        <div className="history-header-left">
          <h1 className="history-title">归档</h1>
          <div className="header-divider"></div>
          <div className="search-container">
            <MagnifyingGlass className="search-icon" size={16} />
            <input 
              type="text" 
              placeholder="搜索提示词、脚本..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="history-header-right">
          <button 
            className="filter-button"
            onClick={() => console.log('打开筛选')}
          >
            <Faders size={16} /> 筛选
          </button>
          <button 
            className="notification-button"
            onClick={() => console.log('打开通知')}
          >
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* List Area */}
      <div className="history-content">
        <div className="history-inner">
          <h3 className="section-title">最近活动</h3>
          <div className="history-list">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="history-item"
                onClick={() => navigate(`/history/${item.id}`, { state: { historyItem: item } })}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="history-item-icon"
                  style={{ background: item.color, color: item.textColor }}
                >
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <div className="history-item-content">
                  <div className="history-item-header">
                    <h4 className="history-item-title">{item.title}</h4>
                    <span 
                      className="history-item-badge"
                      style={{ 
                        background: item.badgeColor, 
                        borderColor: item.badgeBorder, 
                        color: item.badgeText 
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="history-item-time">活动检测于 {item.time}</p>
                </div>
                <div className="history-item-meta">
                  <div className="history-item-meta-item">
                    <Users size={14} /> <span>{item.info}</span>
                  </div>
                  <span className="history-item-time-meta">{item.time}</span>
                </div>
                <div className="history-item-actions">
                  <DotsThree weight="bold" size={20} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="load-more">
            <button 
              className="load-more-button"
              onClick={() => console.log('加载更多历史记录')}
            >
              加载更早的历史记录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;