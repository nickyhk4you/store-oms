'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 添加适当的类型定义，替换 any
interface SalesDataPoint {
  date: string;
  sales: number;
}

interface OrderItem {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: string;
}

// 模拟数据生成函数
const generateChartData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // 生成随机销售额 (1000-5000)
    const sales = Math.floor(Math.random() * 4000) + 1000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales
    });
  }
  
  return data;
};

// 模拟最近订单数据
const generateRecentOrders = (language: string, count: number) => {
  const zhCustomers = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const enCustomers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Sarah Wilson', 'David Miller', 'Lisa Taylor'];
  
  const zhStatuses = ['已完成', '处理中', '待处理', '已发货'];
  const enStatuses = ['Completed', 'Processing', 'Pending', 'Shipped'];
  
  const orders = [];
  
  for (let i = 1; i <= count; i++) {
    const id = `ORD-${(1000 + i).toString()}`;
    const randomCustomerIndex = Math.floor(Math.random() * 8);
    const randomStatusIndex = Math.floor(Math.random() * 4);
    
    // 生成随机日期 (过去7天内)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    // 生成随机金额
    const amount = Math.floor(Math.random() * 10000) / 100;
    
    if (language === 'zh') {
      orders.push({
        id,
        customer: zhCustomers[randomCustomerIndex],
        date: formattedDate,
        status: zhStatuses[randomStatusIndex],
        total: `¥${amount.toFixed(2)}`
      });
    } else {
      orders.push({
        id,
        customer: enCustomers[randomCustomerIndex],
        date: formattedDate,
        status: enStatuses[randomStatusIndex],
        total: `$${(amount / 6.8).toFixed(2)}`
      });
    }
  }
  
  return orders;
};

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [recentOrders, setRecentOrders] = useState<OrderItem[]>([]);
  const chartRef = useRef<Chart<"line">>(null);
  
  // 模拟订单状态分布
  const orderStatusData = language === 'zh' 
    ? [
        { status: '已完成', count: 124, color: 'bg-green-500' },
        { status: '处理中', count: 42, color: 'bg-blue-500' },
        { status: '待处理', count: 38, color: 'bg-yellow-500' },
        { status: '已发货', count: 65, color: 'bg-purple-500' }
      ]
    : [
        { status: 'Completed', count: 124, color: 'bg-green-500' },
        { status: 'Processing', count: 42, color: 'bg-blue-500' },
        { status: 'Pending', count: 38, color: 'bg-yellow-500' },
        { status: 'Shipped', count: 65, color: 'bg-purple-500' }
      ];
  
  // 计算总订单数
  const totalOrders = orderStatusData.reduce((sum, item) => sum + item.count, 0);
  
  useEffect(() => {
    // 生成销售数据
    setSalesData(generateChartData(30));
    
    // 生成最近订单
    setRecentOrders(generateRecentOrders(language, 5));
  }, [language]);
  
  // 获取状态颜色的辅助函数
  function getStatusColor(status: string) {
    if (language === 'zh') {
      switch (status) {
        case "已完成":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "处理中":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case "待处理":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "已发货":
          return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
    } else {
      switch (status) {
        case "Completed":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "Processing":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case "Pending":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "Shipped":
          return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
    }
  }

  // 准备图表数据
  const chartData: ChartData<'line'> = {
    labels: salesData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: language === 'zh' ? '销售额' : 'Sales',
        data: salesData.map(item => item.sales),
        borderColor: 'rgba(59, 130, 246, 1)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true
      }
    ]
  };

  // 图表配置
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderColor: 'rgba(107, 114, 128, 0.3)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            return salesData[index]?.date;
          },
          label: (context: any) => {
            const value = context.raw;
            return language === 'zh' 
              ? `¥${value.toLocaleString()}` 
              : `$${(value / 6.8).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          callback: (value: any) => {
            if (value >= 1000) {
              return language === 'zh' 
                ? `¥${value / 1000}k` 
                : `$${(value / 6.8 / 1000).toFixed(1)}k`;
            }
            return language === 'zh' ? `¥${value}` : `$${(value / 6.8).toFixed(2)}`;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('dashboard.overview')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('total.orders')}</h2>
              <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </span>
            </div>
            <div className="text-3xl font-bold mb-2">{totalOrders}</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ 12% {t('from.last.month')}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('total.revenue')}</h2>
              <span className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
            </div>
            <div className="text-3xl font-bold mb-2">{language === 'zh' ? '¥42,850' : '$6,285'}</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ 8.2% {t('from.last.month')}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('avg.order.value')}</h2>
              <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </span>
            </div>
            <div className="text-3xl font-bold mb-2">{language === 'zh' ? '¥159.80' : '$23.50'}</div>
            <div className="text-sm text-red-600 dark:text-red-400">↓ 2.3% {t('from.last.month')}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('conversion.rate')}</h2>
              <span className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </span>
            </div>
            <div className="text-3xl font-bold mb-2">3.6%</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ 0.8% {t('from.last.month')}</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">{t('sales.trend')}</h2>
          <div className="h-80">
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 订单状态分布 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">{t('order.status.distribution')}</h2>
            <div className="space-y-4">
              {orderStatusData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{item.status}</span>
                    <span>{item.count} ({Math.round((item.count / totalOrders) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`${item.color} h-2.5 rounded-full`} 
                      style={{ width: `${(item.count / totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 最近订单 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('recent.orders')}</h2>
              <Link 
                href="/orders" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                {t('view.all')}
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2 text-left">{t('order.id')}</th>
                    <th className="px-4 py-2 text-left">{t('customer')}</th>
                    <th className="px-4 py-2 text-left">{t('status')}</th>
                    <th className="px-4 py-2 text-right">{t('total')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* 性能指标 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">{t('performance.metrics')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 mb-2">{t('avg.processing.time')}</div>
              <div className="text-2xl font-bold">1.8 {t('days')}</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">↓ 0.3 {t('days')}</div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 mb-2">{t('return.rate')}</div>
              <div className="text-2xl font-bold">2.4%</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">↓ 0.8%</div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 mb-2">{t('customer.satisfaction')}</div>
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">↑ 0.2</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 