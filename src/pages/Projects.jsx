import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Plus, MagnifyingGlass, Faders, DotsThree, Clock, Users, CheckCircle, Circle, XCircle } from '@phosphor-icons/react';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus] = useState('全部');

  const projects = [
    { 
      id: 1, 
      name: '霓虹东京开场视频', 
      description: '赛博朋克风格的3D动画开场', 
      status: '进行中', 
      progress: 65,
      members: 3,
      updated: '2小时前',
      color: 'rgb(37, 99, 235)',
      bgColor: 'rgb(239, 246, 255)'
    },
    { 
      id: 2, 
      name: '企业官网重构', 
      description: '响应式网站设计与开发', 
      status: '已完成', 
      progress: 100,
      members: 5,
      updated: '1天前',
      color: 'rgb(16, 185, 129)',
      bgColor: 'rgb(209, 250, 229)'
    },
    { 
      id: 3, 
      name: '数据分析仪表盘', 
      description: '实时数据可视化平台', 
      status: '规划中', 
      progress: 20,
      members: 2,
      updated: '3天前',
      color: 'rgb(249, 115, 22)',
      bgColor: 'rgb(255, 237, 213)'
    },
    { 
      id: 4, 
      name: '移动应用UI设计', 
      description: 'iOS和Android原生应用界面', 
      status: '进行中', 
      progress: 45,
      members: 4,
      updated: '5小时前',
      color: 'rgb(147, 51, 234)',
      bgColor: 'rgb(243, 232, 255)'
    },
    { 
      id: 5, 
      name: '品牌标识设计', 
      description: '完整的品牌视觉识别系统', 
      status: '已完成', 
      progress: 100,
      members: 2,
      updated: '1周前',
      color: 'rgb(16, 185, 129)',
      bgColor: 'rgb(209, 250, 229)'
    },
    { 
      id: 6, 
      name: 'API文档生成', 
      description: '自动化API文档和测试', 
      status: '已暂停', 
      progress: 30,
      members: 1,
      updated: '2周前',
      color: 'rgb(107, 114, 128)',
      bgColor: 'rgb(229, 231, 235)'
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === '全部' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case '已完成':
        return <CheckCircle weight="fill" size={16} />;
      case '进行中':
        return <Circle weight="fill" size={16} />;
      case '已暂停':
        return <XCircle weight="fill" size={16} />;
      default:
        return <Clock weight="fill" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case '已完成':
        return { color: 'rgb(16, 185, 129)', bg: 'rgb(209, 250, 229)' };
      case '进行中':
        return { color: 'rgb(37, 99, 235)', bg: 'rgb(239, 246, 255)' };
      case '已暂停':
        return { color: 'rgb(107, 114, 128)', bg: 'rgb(229, 231, 235)' };
      default:
        return { color: 'rgb(249, 115, 22)', bg: 'rgb(255, 237, 213)' };
    }
  };

  return (
    <div className="projects-container">
      <header className="projects-header">
        <div className="projects-header-left">
          <h1 className="projects-title">
            <FolderOpen weight="bold" className="projects-title-icon" size={28} /> 项目
          </h1>
          <p className="projects-subtitle">管理和跟踪您的所有项目</p>
        </div>
        <button 
          className="projects-create-button"
          onClick={() => console.log('创建新项目')}
        >
          <Plus size={18} weight="bold" /> 新建项目
        </button>
      </header>

      <div className="projects-toolbar">
        <div className="projects-search">
          <MagnifyingGlass size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgb(148, 163, 184)' }} />
          <input
            type="text"
            placeholder="搜索项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="projects-search-input"
          />
        </div>
        <button 
          className="projects-filter-button"
          onClick={() => console.log('打开筛选')}
        >
          <Faders size={16} /> 筛选
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => {
          const statusStyle = getStatusColor(project.status);
          return (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => navigate(`/project/${project.id}`, { state: { project: project } })}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-card-header">
                <div className="project-icon" style={{ background: project.bgColor, color: project.color }}>
                  <FolderOpen weight="fill" size={24} />
                </div>
                <button 
                  className="project-actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`打开项目菜单: ${project.name}`);
                  }}
                >
                  <DotsThree weight="bold" size={20} />
                </button>
              </div>
              <div className="project-content">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-progress">
                  <div className="project-progress-header">
                    <span className="project-progress-label">进度</span>
                    <span className="project-progress-value">{project.progress}%</span>
                  </div>
                  <div className="project-progress-bar">
                    <div 
                      className="project-progress-fill"
                      style={{ width: `${project.progress}%`, background: project.color }}
                    ></div>
                  </div>
                </div>
                <div className="project-footer">
                  <div className="project-meta">
                    <div className="project-meta-item" style={{ color: statusStyle.color }}>
                      {getStatusIcon(project.status)}
                      <span>{project.status}</span>
                    </div>
                    <div className="project-meta-item">
                      <Users size={14} />
                      <span>{project.members}人</span>
                    </div>
                    <div className="project-meta-item">
                      <Clock size={14} />
                      <span>{project.updated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
