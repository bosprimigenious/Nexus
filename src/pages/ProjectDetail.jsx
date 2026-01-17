import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { X } from '@phosphor-icons/react';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project || { id, name: '项目', description: '项目描述', status: '进行中', progress: 0 };

  return (
    <div className="project-detail-container">
      <header className="project-detail-header">
        <button 
          className="project-detail-back-button"
          onClick={() => navigate('/projects')}
        >
          <X size={20} />
        </button>
        <h1 className="project-detail-title">项目详情 - {project.name}</h1>
      </header>
      <div className="project-detail-content">
        <div className="project-detail-card">
          <h2>{project.name}</h2>
          <p>描述: {project.description}</p>
          <p>状态: {project.status}</p>
          <p>进度: {project.progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
