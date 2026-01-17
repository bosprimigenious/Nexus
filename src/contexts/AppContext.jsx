import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('app-language');
    return saved || 'zh-CN';
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app-theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  useEffect(() => {
    // 如果当前是深色模式，强制切换到浅色
    const currentTheme = theme === 'dark' ? 'light' : theme;
    if (theme === 'dark') {
      localStorage.setItem('app-theme', 'light');
    } else {
      localStorage.setItem('app-theme', currentTheme);
    }
    
    const root = document.documentElement;
    
    // 移除所有主题类，始终使用浅色模式
    root.classList.remove('dark', 'light');
    root.classList.add('light');
    
    // 如果当前是深色模式，更新状态
    if (theme === 'dark') {
      setTheme('light');
    }
  }, [theme]);

  // 初始化时应用主题（始终使用浅色）
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    
    // 如果保存的是深色模式，强制切换到浅色
    if (savedTheme === 'dark') {
      setTheme('light');
      localStorage.setItem('app-theme', 'light');
    }
    
    root.classList.remove('dark', 'light');
    root.classList.add('light');
  }, []);

  // 自动模式也始终使用浅色
  useEffect(() => {
    if (theme === 'auto') {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add('light');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
