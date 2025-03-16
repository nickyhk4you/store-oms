import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // 检查系统偏好或本地存储
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // 在 html 元素上添加或移除 dark 类
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };
  
  return (
    <button
      onClick={toggleDarkMode}
      className="ml-3 p-2 rounded-full bg-[#F5EFE0] text-[#6B4423] hover:bg-[#C3A080]/20 dark:bg-[#6B4423]/10 dark:text-[#C3A080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4423]"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
} 