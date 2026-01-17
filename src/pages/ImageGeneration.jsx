import React, { useState } from 'react';
import { Image, X, Download, Gear, Sparkle, GridFour, Upload } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import './ImageGeneration.css';

const ImageGeneration = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const imageInputRef = React.useRef(null);

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      console.log('上传的图片文件:', file.name);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // 模拟生成
    setTimeout(() => {
      setGeneratedImages([
        { id: 1, url: '', prompt: prompt },
        { id: 2, url: '', prompt: prompt },
        { id: 3, url: '', prompt: prompt },
        { id: 4, url: '', prompt: prompt },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="image-generation-container">
      <header className="image-header">
        <div className="image-header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            <X size={20} />
          </button>
          <div className="image-header-title">
            <Image weight="fill" size={24} className="image-header-icon" />
            <h1>图像生成</h1>
          </div>
        </div>
        <div className="image-header-actions">
          <button 
            className="header-action-button"
            onClick={() => navigate('/settings')}
          >
            <Gear size={18} />
          </button>
        </div>
      </header>

      <div className="image-content">
        <div className="image-main-panel">
          <div className="prompt-section">
            <div className="prompt-header">
              <span className="prompt-title">图像描述</span>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <button 
                className="upload-image-button"
                onClick={handleImageUpload}
              >
                <Upload size={16} />
                {uploadedImage ? uploadedImage.name : '上传图片'}
              </button>
            </div>
            <textarea
              className="prompt-textarea"
              placeholder="描述您想要生成的图像...&#10;&#10;例如：&#10;一只可爱的猫咪坐在窗台上，阳光透过窗户洒在它身上，背景是温馨的客厅，风格为水彩画"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="prompt-footer">
              <div className="prompt-tips">
                <span>提示：描述越详细，生成效果越好</span>
              </div>
              <button 
                className="generate-image-button"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
              >
                <Sparkle weight="fill" size={18} />
                {isGenerating ? '生成中...' : '生成图像'}
              </button>
            </div>
          </div>

          {isGenerating && (
            <div className="generating-overlay">
              <div className="generating-content">
                <Sparkle weight="fill" size={48} className="generating-icon" />
                <span>正在生成图像...</span>
              </div>
            </div>
          )}

          {generatedImages.length > 0 && (
            <div className="images-grid">
              <div className="grid-header">
                <span>生成结果</span>
                <button className="grid-view-button">
                  <GridFour size={18} />
                </button>
              </div>
              <div className="images-container">
                {generatedImages.map((img) => (
                  <div key={img.id} className="image-card">
                    <div className="image-placeholder">
                      <Image size={32} />
                    </div>
                    <div className="image-actions">
                      <button className="image-action-button">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {generatedImages.length === 0 && !isGenerating && (
            <div className="empty-state">
              <Image size={64} className="empty-icon" />
              <span className="empty-title">开始生成您的图像</span>
              <p className="empty-desc">在上方输入描述，AI将为您生成精美的图像</p>
            </div>
          )}
        </div>

        <div className="image-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">生成参数</h3>
            <div className="param-item">
              <label>风格</label>
              <select className="param-select">
                <option>写实</option>
                <option>卡通</option>
                <option>水彩</option>
                <option>油画</option>
                <option>数字艺术</option>
              </select>
            </div>
            <div className="param-item">
              <label>尺寸</label>
              <select className="param-select">
                <option>1024x1024 (正方形)</option>
                <option>1024x768 (横向)</option>
                <option>768x1024 (纵向)</option>
              </select>
            </div>
            <div className="param-item">
              <label>数量</label>
              <select className="param-select">
                <option>1张</option>
                <option>4张</option>
                <option>9张</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">历史记录</h3>
            <div className="image-history">
              <div className="history-item">
                <div className="history-thumbnail"></div>
                <div className="history-info">
                  <span className="history-name">城市夜景</span>
                  <span className="history-time">5小时前</span>
                </div>
              </div>
              <div className="history-item">
                <div className="history-thumbnail"></div>
                <div className="history-info">
                  <span className="history-name">抽象艺术</span>
                  <span className="history-time">1天前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
