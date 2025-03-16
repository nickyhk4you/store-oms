// Coach 品牌配色方案
export const coachColors = {
  // 主要颜色
  primary: {
    brown: '#6B4423', // Coach 标志性深棕色
    tan: '#C3A080',   // 经典米色/棕褐色
    cream: '#F5EFE0',  // 奶油色/象牙色
  },
  // 辅助颜色
  secondary: {
    gold: '#D4AF37',   // 金色点缀
    burgundy: '#800020', // 酒红色
    navy: '#1B365D',   // 深海军蓝
  },
  // 功能颜色
  functional: {
    success: '#4D7C4D', // 深绿色成功提示
    warning: '#CD7F32', // 铜色警告
    error: '#A02C2C',   // 深红色错误
    info: '#4A6FA5',    // 蓝色信息
  },
  // 中性色
  neutral: {
    white: '#FFFFFF',
    lightest: '#F8F8F8',
    light: '#E0E0E0',
    medium: '#9E9E9E',
    dark: '#616161',
    darkest: '#212121',
  }
};

// 状态颜色映射
export const statusColors = {
  completed: 'bg-[#4D7C4D]/10 text-[#4D7C4D] dark:bg-[#4D7C4D]/20 dark:text-[#8FBF8F]',
  processing: 'bg-[#4A6FA5]/10 text-[#4A6FA5] dark:bg-[#4A6FA5]/20 dark:text-[#8EAFD4]',
  pending: 'bg-[#CD7F32]/10 text-[#CD7F32] dark:bg-[#CD7F32]/20 dark:text-[#E0B87A]',
  shipped: 'bg-[#6B4423]/10 text-[#6B4423] dark:bg-[#6B4423]/20 dark:text-[#C3A080]',
  cancelled: 'bg-[#A02C2C]/10 text-[#A02C2C] dark:bg-[#A02C2C]/20 dark:text-[#D47979]',
}; 