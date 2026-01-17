import React, { useState } from 'react';
import { ChartLine, CaretUp, CaretDown, Users, Clock, Lightning, ArrowUpRight } from '@phosphor-icons/react';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7天');

  const stats = [
    { 
      label: '总任务数', 
      value: '1,234', 
      change: '+12.5%', 
      trend: 'up',
      icon: <ChartLine weight="fill" />,
      color: 'rgb(37, 99, 235)',
      bg: 'rgb(239, 246, 255)'
    },
    { 
      label: '完成率', 
      value: '89.2%', 
      change: '+3.2%', 
      trend: 'up',
      icon: <CaretUp weight="fill" />,
      color: 'rgb(16, 185, 129)',
      bg: 'rgb(209, 250, 229)'
    },
    { 
      label: '活跃用户', 
      value: '456', 
      change: '-2.1%', 
      trend: 'down',
      icon: <Users weight="fill" />,
      color: 'rgb(147, 51, 234)',
      bg: 'rgb(243, 232, 255)'
    },
    { 
      label: '平均响应时间', 
      value: '1.2s', 
      change: '-15.3%', 
      trend: 'down',
      icon: <Lightning weight="fill" />,
      color: 'rgb(249, 115, 22)',
      bg: 'rgb(255, 237, 213)'
    },
  ];

  const recentActivities = [
    { id: 1, action: '完成项目', project: '霓虹东京开场视频', time: '2分钟前', type: 'success' },
    { id: 2, action: '创建任务', project: '企业官网重构', time: '15分钟前', type: 'info' },
    { id: 3, action: '更新进度', project: '数据分析仪表盘', time: '1小时前', type: 'info' },
    { id: 4, action: '添加成员', project: '移动应用UI设计', time: '2小时前', type: 'info' },
    { id: 5, action: '完成项目', project: '品牌标识设计', time: '1天前', type: 'success' },
  ];

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <div>
          <h1 className="analytics-title">
            <ChartLine weight="bold" className="analytics-title-icon" size={28} /> 数据分析
          </h1>
          <p className="analytics-subtitle">查看项目统计和性能指标</p>
        </div>
        <div className="analytics-time-selector">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option>今天</option>
            <option>7天</option>
            <option>30天</option>
            <option>90天</option>
          </select>
        </div>
      </header>

      <div className="analytics-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">任务完成趋势</h3>
            <button 
              className="chart-action"
              onClick={() => console.log('查看详细数据')}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 80, 45, 90, 70, 85, 95].map((height, i) => (
                <div 
                  key={i} 
                  className="chart-bar"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">智能体使用分布</h3>
            <button 
              className="chart-action"
              onClick={() => console.log('查看详细数据')}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="chart-placeholder">
            <div className="chart-pie">
              <div className="pie-segment" style={{ '--percentage': '35%', '--color': 'rgb(37, 99, 235)' }}></div>
              <div className="pie-segment" style={{ '--percentage': '25%', '--color': 'rgb(16, 185, 129)' }}></div>
              <div className="pie-segment" style={{ '--percentage': '20%', '--color': 'rgb(147, 51, 234)' }}></div>
              <div className="pie-segment" style={{ '--percentage': '20%', '--color': 'rgb(249, 115, 22)' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-bottom-grid">
        <div className="analytics-activities">
          <h3 className="activities-title">最近活动</h3>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-project">{activity.project}</div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-performance">
          <h3 className="performance-title">性能指标</h3>
          <div className="performance-metrics">
            <div className="metric-item">
              <div className="metric-label">CPU使用率</div>
              <div className="metric-value">68%</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '68%', background: 'rgb(37, 99, 235)' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">内存使用率</div>
              <div className="metric-value">45%</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '45%', background: 'rgb(16, 185, 129)' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">网络带宽</div>
              <div className="metric-value">82%</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '82%', background: 'rgb(249, 115, 22)' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">存储使用</div>
              <div className="metric-value">34%</div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '34%', background: 'rgb(147, 51, 234)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-tables-grid">
        <div className="table-card">
          <h3 className="table-title">热门智能体</h3>
          <div className="table-content">
            <div className="table-row header">
              <div className="table-cell">智能体</div>
              <div className="table-cell">使用次数</div>
              <div className="table-cell">成功率</div>
            </div>
            <div className="table-row">
              <div className="table-cell">编排器 V2</div>
              <div className="table-cell">1,234</div>
              <div className="table-cell success">98.5%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">代码架构师</div>
              <div className="table-cell">892</div>
              <div className="table-cell success">95.2%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">图像生成器</div>
              <div className="table-cell">756</div>
              <div className="table-cell success">92.8%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">翻译助手</div>
              <div className="table-cell">634</div>
              <div className="table-cell success">97.1%</div>
            </div>
          </div>
        </div>

        <div className="table-card">
          <h3 className="table-title">任务类型分布</h3>
          <div className="table-content">
            <div className="table-row header">
              <div className="table-cell">类型</div>
              <div className="table-cell">数量</div>
              <div className="table-cell">占比</div>
            </div>
            <div className="table-row">
              <div className="table-cell">视频生成</div>
              <div className="table-cell">456</div>
              <div className="table-cell">37%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">代码开发</div>
              <div className="table-cell">312</div>
              <div className="table-cell">25%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">图像设计</div>
              <div className="table-cell">234</div>
              <div className="table-cell">19%</div>
            </div>
            <div className="table-row">
              <div className="table-cell">文档处理</div>
              <div className="table-cell">232</div>
              <div className="table-cell">19%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
