import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Cpu, Code, Palette, ShieldCheck, Lightning, Circle, Plus, MagnifyingGlass, Faders } from '@phosphor-icons/react';
import './Agents.css';

const Agents = () => {
  const navigate = useNavigate();
  const [agents] = useState([
    { id: 1, name: '编排器 V2', role: '工作流逻辑', status: '在线', power: 98, icon: <Cpu />, color: 'rgb(37, 99, 235)', bg: 'rgb(239, 246, 255)' },
    { id: 2, name: '动画专家', role: '视频合成', status: '忙碌', power: 85, icon: <Palette />, color: 'rgb(147, 51, 234)', bg: 'rgb(243, 232, 255)' },
    { id: 3, name: '代码架构师', role: '全栈开发', status: '在线', power: 92, icon: <Code />, color: 'rgb(16, 185, 129)', bg: 'rgb(209, 250, 229)' },
    { id: 4, name: '安全协议', role: '数据加密', status: '空闲', power: 100, icon: <ShieldCheck />, color: 'rgb(249, 115, 22)', bg: 'rgb(255, 237, 213)' },
    { id: 5, name: '数据分析师', role: '数据洞察', status: '在线', power: 76, icon: <Lightning />, color: 'rgb(250, 204, 21)', bg: 'rgb(254, 243, 199)' },
    { id: 6, name: '图像生成器', role: 'AI绘图', status: '在线', power: 88, icon: <Palette />, color: 'rgb(236, 72, 153)', bg: 'rgb(252, 231, 243)' },
    { id: 7, name: '文档处理器', role: '智能编辑', status: '空闲', power: 65, icon: <Code />, color: 'rgb(107, 114, 128)', bg: 'rgb(229, 231, 235)' },
    { id: 8, name: '翻译助手', role: '多语言', status: '在线', power: 95, icon: <ShieldCheck />, color: 'rgb(59, 130, 246)', bg: 'rgb(219, 234, 254)' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status) => {
    if (status === '在线') return 'online';
    if (status === '忙碌') return 'busy';
    return 'idle';
  };

  return (
    <div className="agents-container">
      <header className="agents-header">
        <h1 className="agents-title">
          <Users weight="bold" className="agents-title-icon" size={28} /> 智能体团队
        </h1>
        <p className="agents-subtitle">管理和监控您的专业AI自主智能体</p>
      </header>

      <div className="agents-actions">
        <button 
          className="action-button primary"
          onClick={() => console.log('添加智能体')}
        >
          <Plus size={16} weight="bold" /> 添加智能体
        </button>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <MagnifyingGlass 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'rgb(148, 163, 184)' 
            }} 
          />
          <input
            type="text"
            placeholder="搜索智能体..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'white',
              border: '1px solid rgb(226, 232, 240)',
              borderRadius: '8px',
              fontSize: '12px',
              outline: 'none'
            }}
          />
        </div>
        <button 
          className="action-button"
          onClick={() => console.log('打开筛选')}
        >
          <Faders size={16} /> 筛选
        </button>
      </div>

      <div className="agents-grid">
        {filteredAgents.map((agent) => (
          <div 
            key={agent.id} 
            className="agent-card"
            onClick={() => navigate(`/agent/${agent.id}`, { state: { agent: agent } })}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="agent-icon-container"
              style={{ background: agent.bg, color: agent.color }}
            >
              {agent.icon}
            </div>
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-role">{agent.role}</p>
            
            <div className="agent-stats">
              <div className="agent-stat-header">
                <span>核心负载</span>
                <span className="agent-stat-value">{agent.power}%</span>
              </div>
              <div className="agent-progress-bar">
                <div 
                  className="agent-progress-fill" 
                  style={{ width: `${agent.power}%` }}
                ></div>
              </div>
              <div className="agent-status">
                <Circle 
                  weight="fill" 
                  className={`agent-status-dot ${getStatusClass(agent.status)}`}
                />
                <span className="agent-status-text">{agent.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="performance-banner">
        <div className="performance-content">
          <div className="performance-icon">
            <Lightning weight="fill" size={24} />
          </div>
          <div className="performance-info">
            <h4>集群性能</h4>
            <p>所有系统运行正常，延迟1.2毫秒</p>
          </div>
        </div>
        <button 
          className="performance-button"
          onClick={() => console.log('优化集群')}
        >
          优化集群
        </button>
      </div>
    </div>
  );
};

export default Agents;