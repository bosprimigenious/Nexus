import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { X, Cpu, Code, Palette, ShieldCheck, Lightning, Circle, ArrowLeft } from '@phosphor-icons/react';
import './AgentDetail.css';

// 智能体数据（与 Agents.jsx 保持一致）
const agentsData = [
  { id: 1, name: '编排器 V2', role: '工作流逻辑', status: '在线', power: 98, icon: <Cpu />, color: 'rgb(37, 99, 235)', bg: 'rgb(239, 246, 255)', description: '负责协调和管理复杂的工作流程，确保各个任务按顺序正确执行。' },
  { id: 2, name: '动画专家', role: '视频合成', status: '忙碌', power: 85, icon: <Palette />, color: 'rgb(147, 51, 234)', bg: 'rgb(243, 232, 255)', description: '专业的视频动画制作和合成工具，支持多种动画效果和转场。' },
  { id: 3, name: '代码架构师', role: '全栈开发', status: '在线', power: 92, icon: <Code />, color: 'rgb(16, 185, 129)', bg: 'rgb(209, 250, 229)', description: '提供全栈开发支持，从前端到后端，确保代码质量和架构设计。' },
  { id: 4, name: '安全协议', role: '数据加密', status: '空闲', power: 100, icon: <ShieldCheck />, color: 'rgb(249, 115, 22)', bg: 'rgb(255, 237, 213)', description: '负责数据加密和安全协议管理，保护系统免受安全威胁。' },
  { id: 5, name: '数据分析师', role: '数据洞察', status: '在线', power: 76, icon: <Lightning />, color: 'rgb(250, 204, 21)', bg: 'rgb(254, 243, 199)', description: '提供数据分析和洞察，帮助做出基于数据的决策。' },
  { id: 6, name: '图像生成器', role: 'AI绘图', status: '在线', power: 88, icon: <Palette />, color: 'rgb(236, 72, 153)', bg: 'rgb(252, 231, 243)', description: '基于AI的图像生成工具，可以创建各种风格的图像和艺术作品。' },
  { id: 7, name: '文档处理器', role: '智能编辑', status: '空闲', power: 65, icon: <Code />, color: 'rgb(107, 114, 128)', bg: 'rgb(229, 231, 235)', description: '智能文档处理和编辑工具，支持多种文档格式和编辑功能。' },
  { id: 8, name: '翻译助手', role: '多语言', status: '在线', power: 95, icon: <ShieldCheck />, color: 'rgb(59, 130, 246)', bg: 'rgb(219, 234, 254)', description: '多语言翻译助手，支持多种语言之间的实时翻译。' },
];

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 优先使用 state 传递的数据，否则根据 id 查找
  const agentFromState = location.state?.agent;
  const agent = agentFromState || agentsData.find(a => a.id === parseInt(id)) || {
    id: parseInt(id),
    name: '智能体',
    role: '未知角色',
    status: '在线',
    power: 0,
    icon: <Cpu />,
    color: 'rgb(100, 116, 139)',
    bg: 'rgb(241, 245, 249)',
    description: '暂无描述'
  };

  const getStatusClass = (status) => {
    if (status === '在线') return 'online';
    if (status === '忙碌') return 'busy';
    return 'idle';
  };

  return (
    <div className="agent-detail-container">
      <header className="agent-detail-header">
        <button 
          className="agent-detail-back-button"
          onClick={() => navigate('/agents')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="agent-detail-title">智能体详情</h1>
      </header>

      <div className="agent-detail-content">
        <div className="agent-detail-main">
          <div className="agent-detail-card">
            <div className="agent-detail-header-section">
              <div 
                className="agent-detail-icon-container"
                style={{ background: agent.bg, color: agent.color }}
              >
                {agent.icon}
              </div>
              <div className="agent-detail-info">
                <h2 className="agent-detail-name">{agent.name}</h2>
                <p className="agent-detail-role">{agent.role}</p>
                <div className="agent-detail-status-badge">
                  <Circle 
                    weight="fill" 
                    className={`agent-detail-status-dot ${getStatusClass(agent.status)}`}
                  />
                  <span>{agent.status}</span>
                </div>
              </div>
            </div>

            <div className="agent-detail-description">
              <h3>描述</h3>
              <p>{agent.description}</p>
            </div>

            <div className="agent-detail-stats">
              <h3>性能指标</h3>
              <div className="stat-item">
                <div className="stat-header">
                  <span>核心负载</span>
                  <span className="stat-value">{agent.power}%</span>
                </div>
                <div className="stat-progress-bar">
                  <div 
                    className="stat-progress-fill" 
                    style={{ width: `${agent.power}%`, background: agent.color }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="agent-detail-actions">
              <button className="action-button primary">
                启动任务
              </button>
              <button className="action-button">
                配置设置
              </button>
              <button className="action-button">
                查看日志
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
