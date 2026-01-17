import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, FilmStrip, CodeBlock, ChartPolar, Translate, Image, FileText, MusicNote, Users, Clock, Download, Share } from '@phosphor-icons/react';
import './HistoryDetail.css';

// 历史记录数据（与 History.jsx 保持一致）
const historyData = [
  { 
    id: 1, 
    title: '赛博朋克城市开场', 
    icon: <FilmStrip weight="fill" />, 
    status: '生成中', 
    time: '2分钟前', 
    info: '3个智能体', 
    color: 'rgb(219, 234, 254)', 
    textColor: 'rgb(37, 99, 235)', 
    badgeColor: 'rgb(219, 234, 254)', 
    badgeBorder: 'rgb(191, 219, 254)', 
    badgeText: 'rgb(37, 99, 235)',
    description: '创建一个赛博朋克风格的3D城市开场动画，包含霓虹灯效果、未来感建筑和动态镜头运动。',
    progress: 65,
    agents: ['动画专家', '编排器 V2', '图像生成器'],
    createdAt: '2024-01-15 14:30',
    updatedAt: '2分钟前'
  },
  { 
    id: 2, 
    title: 'Python脚本重构', 
    icon: <CodeBlock weight="fill" />, 
    status: '已完成', 
    time: '2小时前', 
    info: 'Python', 
    color: 'rgb(243, 232, 255)', 
    textColor: 'rgb(147, 51, 234)', 
    badgeColor: 'rgb(209, 250, 229)', 
    badgeBorder: 'rgb(167, 243, 208)', 
    badgeText: 'rgb(16, 185, 129)',
    description: '重构现有的Python脚本，优化代码结构，提高性能和可维护性。',
    progress: 100,
    agents: ['代码架构师'],
    createdAt: '2024-01-15 10:00',
    updatedAt: '2小时前'
  },
  { 
    id: 3, 
    title: 'Q3财务报告分析', 
    icon: <ChartPolar weight="fill" />, 
    status: '草稿', 
    time: '昨天 14:30', 
    info: 'PDF', 
    color: 'rgb(255, 237, 213)', 
    textColor: 'rgb(249, 115, 22)', 
    badgeColor: 'rgb(241, 245, 249)', 
    badgeBorder: 'rgb(226, 232, 240)', 
    badgeText: 'rgb(100, 116, 139)',
    description: '分析第三季度财务报告，生成数据可视化和关键指标摘要。',
    progress: 30,
    agents: ['数据分析师'],
    createdAt: '2024-01-14 14:30',
    updatedAt: '昨天 14:30'
  },
  { 
    id: 4, 
    title: '合同翻译（中英）', 
    icon: <Translate weight="fill" />, 
    status: '已完成', 
    time: '昨天 09:15', 
    info: '双语', 
    color: 'rgb(209, 250, 229)', 
    textColor: 'rgb(16, 185, 129)', 
    badgeColor: 'rgb(209, 250, 229)', 
    badgeBorder: 'rgb(167, 243, 208)', 
    badgeText: 'rgb(16, 185, 129)',
    description: '将中文合同翻译成英文，确保专业术语准确性和法律条款的完整性。',
    progress: 100,
    agents: ['翻译助手'],
    createdAt: '2024-01-14 09:15',
    updatedAt: '昨天 09:15'
  },
  { 
    id: 5, 
    title: '品牌Logo设计', 
    icon: <Image weight="fill" />, 
    status: '已完成', 
    time: '3天前', 
    info: 'AI绘图', 
    color: 'rgb(254, 226, 226)', 
    textColor: 'rgb(239, 68, 68)', 
    badgeColor: 'rgb(209, 250, 229)', 
    badgeBorder: 'rgb(167, 243, 208)', 
    badgeText: 'rgb(16, 185, 129)',
    description: '为品牌设计现代化Logo，包含多个变体和不同尺寸版本。',
    progress: 100,
    agents: ['图像生成器'],
    createdAt: '2024-01-12 10:00',
    updatedAt: '3天前'
  },
  { 
    id: 6, 
    title: '技术文档编写', 
    icon: <FileText weight="fill" />, 
    status: '生成中', 
    time: '5小时前', 
    info: 'Markdown', 
    color: 'rgb(229, 231, 235)', 
    textColor: 'rgb(107, 114, 128)', 
    badgeColor: 'rgb(219, 234, 254)', 
    badgeBorder: 'rgb(191, 219, 254)', 
    badgeText: 'rgb(37, 99, 235)',
    description: '编写API技术文档，包含接口说明、使用示例和最佳实践。',
    progress: 75,
    agents: ['文档处理器', '代码架构师'],
    createdAt: '2024-01-15 09:00',
    updatedAt: '5小时前'
  },
  { 
    id: 7, 
    title: '背景音乐生成', 
    icon: <MusicNote weight="fill" />, 
    status: '已完成', 
    time: '1周前', 
    info: '音频', 
    color: 'rgb(243, 232, 255)', 
    textColor: 'rgb(168, 85, 247)', 
    badgeColor: 'rgb(209, 250, 229)', 
    badgeBorder: 'rgb(167, 243, 208)', 
    badgeText: 'rgb(16, 185, 129)',
    description: '生成适合视频背景的轻音乐，时长3分钟，风格为现代电子。',
    progress: 100,
    agents: ['动画专家'],
    createdAt: '2024-01-08 15:00',
    updatedAt: '1周前'
  },
];

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 优先使用 state 传递的数据，否则根据 id 查找
  const historyItemFromState = location.state?.historyItem;
  const historyItem = historyItemFromState || historyData.find(item => item.id === parseInt(id)) || {
    id: parseInt(id),
    title: '历史记录',
    status: '已完成',
    time: '未知时间',
    description: '暂无描述',
    progress: 0,
    agents: [],
    createdAt: '',
    updatedAt: ''
  };

  return (
    <div className="history-detail-container">
      <header className="history-detail-header">
        <button 
          className="history-detail-back-button"
          onClick={() => navigate('/history')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="history-detail-title">活动详情</h1>
      </header>

      <div className="history-detail-content">
        <div className="history-detail-main">
          <div className="history-detail-card">
            <div className="history-detail-header-section">
              <div 
                className="history-detail-icon-container"
                style={{ background: historyItem.color, color: historyItem.textColor }}
              >
                {historyItem.icon}
              </div>
              <div className="history-detail-info">
                <h2 className="history-detail-name">{historyItem.title}</h2>
                <div className="history-detail-meta">
                  <span 
                    className="history-detail-badge"
                    style={{ 
                      background: historyItem.badgeColor, 
                      borderColor: historyItem.badgeBorder, 
                      color: historyItem.badgeText 
                    }}
                  >
                    {historyItem.status}
                  </span>
                  <span className="history-detail-time">
                    <Clock size={14} /> 活动检测于 {historyItem.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="history-detail-description">
              <h3>任务描述</h3>
              <p>{historyItem.description}</p>
            </div>

            <div className="history-detail-progress">
              <h3>完成进度</h3>
              <div className="progress-section">
                <div className="progress-header">
                  <span>进度</span>
                  <span className="progress-value">{historyItem.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${historyItem.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="history-detail-agents">
              <h3>参与的智能体</h3>
              <div className="agents-list">
                {historyItem.agents && historyItem.agents.length > 0 ? (
                  historyItem.agents.map((agent, index) => (
                    <div key={index} className="agent-tag">
                      <Users size={14} />
                      <span>{agent}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-agents">暂无智能体参与</p>
                )}
              </div>
            </div>

            <div className="history-detail-timeline">
              <h3>时间线</h3>
              <div className="timeline-items">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">创建任务</div>
                    <div className="timeline-time">{historyItem.createdAt || '未知时间'}</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">最后更新</div>
                    <div className="timeline-time">{historyItem.updatedAt || '未知时间'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="history-detail-actions">
              <button className="action-button primary">
                <Download size={18} />
                下载结果
              </button>
              <button className="action-button">
                <Share size={18} />
                分享
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
