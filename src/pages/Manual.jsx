import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Play, Code, Gear, 
  FilmStrip, PaintBrush, Image, MusicNote,
  CaretRight
} from '@phosphor-icons/react';
import './Manual.css';

const Manual = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'getting-started',
      title: '快速开始',
      icon: <Play weight="fill" />,
      content: [
        {
          subtitle: '1. 创建项目',
          text: '点击侧边栏的"创建项目"按钮，或从仪表盘开始您的第一个项目。'
        },
        {
          subtitle: '2. 输入需求',
          text: '在输入框中描述您的创作需求，例如："生成一个赛博朋克风格的视频开场"。'
        },
        {
          subtitle: '3. 智能体协作',
          text: '系统会自动分配多个智能体协作完成您的任务，包括剧本编写、动画生成等。'
        },
        {
          subtitle: '4. 查看结果',
          text: '在项目详情页面查看生成结果，可以预览、下载或继续编辑。'
        }
      ]
    },
    {
      id: 'features',
      title: '功能模块',
      icon: <FilmStrip weight="fill" />,
      content: [
        {
          subtitle: '视频生成',
          text: '将文本脚本转换为高质量视频，支持多种风格和特效。',
          icon: <FilmStrip />
        },
        {
          subtitle: 'UI/UX设计',
          text: '快速生成界面原型和设计稿，支持多种设计风格。',
          icon: <PaintBrush />
        },
        {
          subtitle: '图像生成',
          text: 'AI绘图功能，根据描述生成高质量图像。',
          icon: <Image />
        },
        {
          subtitle: '音频处理',
          text: '音乐创作和音频处理，支持多种音频格式。',
          icon: <MusicNote />
        }
      ]
    },
    {
      id: 'agents',
      title: '智能体团队',
      icon: <Code weight="fill" />,
      content: [
        {
          subtitle: '编排器 V2',
          text: '核心工作流编排引擎，负责任务分配和协调。'
        },
        {
          subtitle: '动画专家',
          text: '专业视频合成和动画制作智能体。'
        },
        {
          subtitle: '代码架构师',
          text: '全栈开发智能体，负责代码生成和架构设计。'
        },
        {
          subtitle: '数据分析师',
          text: '数据洞察和分析智能体，提供数据可视化支持。'
        }
      ]
    },
    {
      id: 'settings',
      title: '系统设置',
      icon: <Gear weight="fill" />,
      content: [
        {
          subtitle: '语言设置',
          text: '支持中文、英文等多种语言切换。'
        },
        {
          subtitle: '主题设置',
          text: '目前支持浅色主题，更多主题正在开发中。'
        },
        {
          subtitle: '通知设置',
          text: '配置邮件订阅和系统通知偏好。'
        }
      ]
    }
  ];

  return (
    <div className="manual-container">
      {/* Header */}
      <header className="manual-header">
        <div className="manual-header-content">
          <BookOpen size={32} weight="fill" className="manual-header-icon" />
          <div>
            <h1 className="manual-header-title">操作手册</h1>
            <p className="manual-header-subtitle">Nexus Engine 使用指南</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="manual-content">
        <div className="manual-intro">
          <h2>欢迎使用 Nexus Engine</h2>
          <p>
            Nexus Engine V4.0.2 是一个专业的 AIGC 视频全流程辅助系统。
            本手册将帮助您快速上手并充分利用系统的各项功能。
          </p>
        </div>

        {/* Sections */}
        <div className="manual-sections">
          {sections.map((section) => (
            <div key={section.id} className="manual-section">
              <button
                className="manual-section-header"
                onClick={() => toggleSection(section.id)}
              >
                <div className="manual-section-header-left">
                  <div className="manual-section-icon">
                    {section.icon}
                  </div>
                  <h3 className="manual-section-title">{section.title}</h3>
                </div>
                <CaretRight 
                  size={20} 
                  className={`manual-section-arrow ${expandedSection === section.id ? 'expanded' : ''}`}
                />
              </button>
              
              {expandedSection === section.id && (
                <div className="manual-section-content">
                  {section.content.map((item, index) => (
                    <div key={index} className="manual-item">
                      <div className="manual-item-header">
                        {item.icon && (
                          <div className="manual-item-icon">
                            {item.icon}
                          </div>
                        )}
                        <h4 className="manual-item-title">{item.subtitle}</h4>
                      </div>
                      <p className="manual-item-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="manual-quick-actions">
          <h3 className="manual-quick-actions-title">快速操作</h3>
          <div className="manual-quick-actions-grid">
            <button 
              className="manual-quick-action-card"
              onClick={() => navigate('/dashboard')}
            >
              <Play size={24} weight="fill" />
              <span>开始创作</span>
            </button>
            <button 
              className="manual-quick-action-card"
              onClick={() => navigate('/agents')}
            >
              <Code size={24} weight="fill" />
              <span>查看智能体</span>
            </button>
            <button 
              className="manual-quick-action-card"
              onClick={() => navigate('/projects')}
            >
              <FilmStrip size={24} weight="fill" />
              <span>我的项目</span>
            </button>
            <button 
              className="manual-quick-action-card"
              onClick={() => navigate('/settings')}
            >
              <Gear size={24} weight="fill" />
              <span>系统设置</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
