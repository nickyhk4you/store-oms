'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import Pagination from "../components/Pagination";
import Image from "next/image";
// 导入图表相关组件
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
// Import the InventoryActions component
import InventoryActions from '../components/inventory/InventoryActions';

// 注册 Chart.js 组件
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// 库存接口定义
interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  locations: InventoryLocation[];
  lastUpdated: string;
  lowStockThreshold: number;
}

interface InventoryLocation {
  id: string;
  name: string;
  type: 'online' | 'offline';
  stock: number;
}

// 库存筛选条件接口
interface InventoryFilters {
  productId: string;
  productName: string;
  sku: string;
  locationId: string;
  stockStatus: string;
  channelId?: string;
}

export default function InventoryPage() {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<InventoryFilters>({
    productId: '',
    productName: '',
    sku: '',
    locationId: '',
    stockStatus: '',
    channelId: ''
  });
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeSection, setActiveSection] = useState('overview'); // 新增：当前活动的主要部分
  const itemsPerPage = 10;
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // 模拟库存位置数据
  const locations = [
    { id: 'all', name: t('all.locations'), type: 'all' as 'online' | 'offline' | 'all' },
    { id: 'online-main', name: t('online.warehouse'), type: 'online' as 'online' | 'offline' },
    { id: 'store-beijing', name: t('beijing.flagship.store'), type: 'offline' as 'online' | 'offline' },
    { id: 'store-shanghai', name: t('shanghai.store'), type: 'offline' as 'online' | 'offline' },
    { id: 'store-guangzhou', name: t('guangzhou.store'), type: 'offline' as 'online' | 'offline' },
    { id: 'store-shenzhen', name: t('shenzhen.store'), type: 'offline' as 'online' | 'offline' },
  ];
  
  // 模拟库存数据
  const inventoryData: InventoryItem[] = [
    {
      id: 'INV-001',
      productId: 'COACH-001',
      productName: 'Tabby 26 手提包',
      productImage: '/images/coach-tabby-26.jpg',
      sku: 'C5508-B4/BK',
      totalStock: 45,
      availableStock: 42,
      reservedStock: 3,
      locations: [
        { id: 'online-main', name: t('online.warehouse'), type: 'online', stock: 30 },
        { id: 'store-beijing', name: t('beijing.flagship.store'), type: 'offline', stock: 8 },
        { id: 'store-shanghai', name: t('shanghai.store'), type: 'offline', stock: 7 }
      ],
      lastUpdated: '2023-06-15',
      lowStockThreshold: 20
    },
    {
      id: 'INV-002',
      productId: 'COACH-002',
      productName: 'Willow 托特包',
      productImage: '/images/coach-willow-tote.jpg',
      sku: 'C2779-B4/BK',
      totalStock: 32,
      availableStock: 30,
      reservedStock: 2,
      locations: [
        { id: 'online-main', name: t('online.warehouse'), type: 'online', stock: 20 },
        { id: 'store-beijing', name: t('beijing.flagship.store'), type: 'offline', stock: 5 },
        { id: 'store-shanghai', name: t('shanghai.store'), type: 'offline', stock: 4 },
        { id: 'store-guangzhou', name: t('guangzhou.store'), type: 'offline', stock: 3 }
      ],
      lastUpdated: '2023-06-18',
      lowStockThreshold: 15
    },
    {
      id: 'INV-003',
      productId: 'COACH-003',
      productName: 'Pillow Tabby 18 单肩包',
      productImage: '/images/coach-pillow-tabby.jpg',
      sku: 'C5846-B4/MC',
      totalStock: 28,
      availableStock: 25,
      reservedStock: 3,
      locations: [
        { id: 'online-main', name: t('online.warehouse'), type: 'online', stock: 18 },
        { id: 'store-beijing', name: t('beijing.flagship.store'), type: 'offline', stock: 6 },
        { id: 'store-shenzhen', name: t('shenzhen.store'), type: 'offline', stock: 4 }
      ],
      lastUpdated: '2023-06-20',
      lowStockThreshold: 15
    },
    {
      id: 'INV-004',
      productId: 'COACH-004',
      productName: 'Kacey 高跟鞋',
      productImage: '/images/coach-kacey-heels.jpg',
      sku: 'G4737-BLK',
      totalStock: 53,
      availableStock: 50,
      reservedStock: 3,
      locations: [
        { id: 'online-main', name: t('online.warehouse'), type: 'online', stock: 40 },
        { id: 'store-beijing', name: t('beijing.flagship.store'), type: 'offline', stock: 8 },
        { id: 'store-guangzhou', name: t('guangzhou.store'), type: 'offline', stock: 5 }
      ],
      lastUpdated: '2023-06-12',
      lowStockThreshold: 25
    },
    {
      id: 'INV-005',
      productId: 'COACH-005',
      productName: 'Citysole 运动鞋',
      productImage: '/images/coach-citysole.jpg',
      sku: 'G5038-WHT',
      totalStock: 27,
      availableStock: 25,
      reservedStock: 2,
      locations: [
        { id: 'online-main', name: t('online.warehouse'), type: 'online', stock: 20 },
        { id: 'store-shanghai', name: t('shanghai.store'), type: 'offline', stock: 7 }
      ],
      lastUpdated: '2023-06-10',
      lowStockThreshold: 15
    }
  ];
  
  // 初始化筛选结果
  useEffect(() => {
    setFilteredInventory(inventoryData);
  }, []);
  
  // 处理筛选
  const handleSearch = (searchFilters: InventoryFilters) => {
    let results = [...inventoryData];
    
    if (searchFilters.productId) {
      results = results.filter(item => 
        item.productId.toLowerCase().includes(searchFilters.productId.toLowerCase())
      );
    }
    
    if (searchFilters.productName) {
      results = results.filter(item => 
        item.productName.toLowerCase().includes(searchFilters.productName.toLowerCase())
      );
    }
    
    if (searchFilters.sku) {
      results = results.filter(item => 
        item.sku.toLowerCase().includes(searchFilters.sku.toLowerCase())
      );
    }
    
    if (searchFilters.locationId && searchFilters.locationId !== 'all') {
      results = results.filter(item => 
        item.locations.some(loc => loc.id === searchFilters.locationId)
      );
    }
    
    if (searchFilters.stockStatus) {
      switch (searchFilters.stockStatus) {
        case 'low':
          results = results.filter(item => 
            item.availableStock > 0 && item.availableStock <= item.lowStockThreshold
          );
          break;
        case 'out':
          results = results.filter(item => item.availableStock === 0);
          break;
        case 'in':
          results = results.filter(item => item.availableStock > item.lowStockThreshold);
          break;
      }
    }
    
    if (searchFilters.channelId) {
      results = results.filter(item => 
        item.locations.some(loc => loc.type === searchFilters.channelId)
      );
    }
    
    setFilteredInventory(results);
    setCurrentPage(1); // 重置到第一页
  };
  
  // 处理标签切换
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    let results = [...inventoryData];
    
    // 根据标签筛选
    if (index === 1) { // 在线库存
      results = results.filter(item => 
        item.locations.some(loc => loc.type === 'online')
      );
    } else if (index === 2) { // 线下库存
      results = results.filter(item => 
        item.locations.some(loc => loc.type === 'offline')
      );
    }
    
    setFilteredInventory(results);
    setCurrentPage(1); // 重置到第一页
  };
  
  // 分页处理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 计算当前页的库存项
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  
  // 处理筛选表单变化
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理筛选表单提交
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(filters);
  };

  // 处理筛选重置
  const handleFilterReset = () => {
    const emptyFilters = {
      productId: '',
      productName: '',
      sku: '',
      locationId: '',
      stockStatus: '',
      channelId: ''
    };
    setFilters(emptyFilters);
    handleSearch(emptyFilters);
  };
  
  // 渠道库存数据
  const channelInventoryData = {
    labels: [t('channel.taobao'), t('channel.jd'), t('channel.xiaohongshu'), t('channel.douyin'), t('channel.wechat'), t('channel.offline')],
    datasets: [
      {
        label: t('inventory.distribution'),
        data: [35, 25, 15, 10, 5, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 库存趋势数据
  const inventoryTrendData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: t('channel.taobao'),
        data: [30, 35, 40, 38, 42, 45],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: t('channel.jd'),
        data: [25, 28, 30, 32, 35, 38],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: t('channel.offline'),
        data: [20, 18, 15, 12, 10, 8],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  // 库存周转率数据
  const turnoverRateData = {
    labels: [t('channel.taobao'), t('channel.jd'), t('channel.xiaohongshu'), t('channel.douyin'), t('channel.offline')],
    datasets: [
      {
        label: t('inventory.turnover.rate'),
        data: [4.2, 3.8, 2.5, 3.0, 1.8],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 图表配置选项
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'rgb(var(--foreground-rgb))',
        },
      },
      title: {
        display: true,
        text: t('inventory.distribution.by.channel'),
        color: 'rgb(var(--foreground-rgb))',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(var(--foreground-rgb))',
        },
      },
      title: {
        display: true,
        text: t('inventory.trend.by.channel'),
        color: 'rgb(var(--foreground-rgb))',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(var(--foreground-rgb))',
        },
        grid: {
          color: 'rgba(var(--foreground-rgb), 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgb(var(--foreground-rgb))',
        },
        grid: {
          color: 'rgba(var(--foreground-rgb), 0.1)',
        },
      },
    },
  };

  const horizontalBarOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(var(--foreground-rgb))',
        },
      },
      title: {
        display: true,
        text: t('inventory.turnover.rate'),
        color: 'rgb(var(--foreground-rgb))',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(var(--foreground-rgb))',
        },
        grid: {
          color: 'rgba(var(--foreground-rgb), 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgb(var(--foreground-rgb))',
        },
        grid: {
          color: 'rgba(var(--foreground-rgb), 0.1)',
        },
      },
    },
  };
  
  return (
    <div className="min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{t('inventory.management')}</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('export.inventory')}
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              {t('add.inventory')}
            </button>
          </div>
        </div>

        {/* 主导航选项卡 */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8" aria-label="Inventory sections">
            <button
              onClick={() => setActiveSection('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('inventory.overview')}
            </button>
            <button
              onClick={() => setActiveSection('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'list'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('inventory.list')}
            </button>
            <button
              onClick={() => setActiveSection('channels')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'channels'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('channel.management')}
            </button>
            <button
              onClick={() => setActiveSection('activity')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'activity'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('inventory.activity')}
            </button>
          </nav>
        </div>

        {/* 根据选中的部分显示不同内容 */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* 库存概览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('total.products')}</h3>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">125</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('in.stock.products')}</h3>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">98</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('low.stock.products')}</h3>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">18</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('out.of.stock.products')}</h3>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 渠道库存分析 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('channel.inventory.analysis')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">{t('inventory.distribution.by.channel')}</h3>
                  <div className="h-64 relative">
                    <Pie data={channelInventoryData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            color: 'rgb(156, 163, 175)'
                          }
                        }
                      }
                    }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">{t('channel.performance')}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.taobao')}</span>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">70%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.jd')}</span>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">55%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.offline')}</span>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.xiaohongshu')}</span>
                      <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 库存效率指标 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-3">{t('inventory.turnover.rate')}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.2</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.turnover.rate.annual')}</div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <svg className="w-4 h-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-green-500">+0.8 vs last year</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-3">{t('inventory.efficiency')}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">87</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('avg.days.in.inventory')}</div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <svg className="w-4 h-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-green-500">-12 days vs last quarter</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-3">{t('inventory.accuracy')}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">98.5%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stockout.rate')}: <span className="text-red-600 dark:text-red-400">2.3%</span></div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <svg className="w-4 h-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-green-500">+1.2% vs last month</span>
                </div>
              </div>
            </div>
            
            {/* 库存洞察 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t('inventory.insights')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">{t('top.selling.products')}</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Tabby 26 手提包</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">42 {t('units')}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Willow 手提包</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">38 {t('units')}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Kira 链条包</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">27 {t('units')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-2">{t('recommendations')}</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-red-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {t('inventory.insight.1')}
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-orange-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {t('inventory.insight.2')}
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {t('inventory.insight.3')}
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-purple-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {t('inventory.insight.4')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 库存警报 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{t('inventory.alerts')}</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {t('view.all.alerts')}
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">{t('low.stock.alert')}</h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                      <p>18 {t('products.low.stock')}</p>
                    </div>
                    <div className="mt-3">
                      <div className="-mx-2 -my-1.5 flex">
                        <button className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600">
                          {t('view.products')}
                        </button>
                        <button className="ml-3 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600">
                          {t('restock')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{t('out.of.stock.alert')}</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                      <p>9 {t('products.out.of.stock')}</p>
                    </div>
                    <div className="mt-3">
                      <div className="-mx-2 -my-1.5 flex">
                        <button className="px-2 py-1.5 rounded-md text-sm font-medium text-red-800 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600">
                          {t('view.products')}
                        </button>
                        <button className="ml-3 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600">
                          {t('place.order')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'list' && (
          <div className="space-y-6">
            {/* 筛选器 */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t('filter.inventory')}</h2>
                <button
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {isFilterExpanded ? t('collapse') : t('expand')}
                </button>
              </div>
              
              {isFilterExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('product.id')}
                    </label>
                    <input
                      type="text"
                      id="productId"
                      name="productId"
                      value={filters.productId}
                      onChange={handleFilterChange}
                      placeholder={t('enter.product.id')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('product.name')}
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={filters.productName}
                      onChange={handleFilterChange}
                      placeholder={t('enter.product.name')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('sku')}
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={filters.sku}
                      onChange={handleFilterChange}
                      placeholder={t('enter.sku')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('location')}
                    </label>
                    <select
                      id="locationId"
                      name="locationId"
                      value={filters.locationId}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">{t('all.locations')}</option>
                      {locations.filter(loc => loc.id !== 'all').map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('stock.status')}
                    </label>
                    <select
                      id="stockStatus"
                      name="stockStatus"
                      value={filters.stockStatus}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">{t('stock.status.all')}</option>
                      <option value="in">{t('stock.status.in')}</option>
                      <option value="low">{t('stock.status.low')}</option>
                      <option value="out">{t('stock.status.out')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="channelId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('channel')}
                    </label>
                    <select
                      id="channelId"
                      name="channelId"
                      value={filters.channelId || ''}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">{t('channel.all')}</option>
                      <option value="online">{t('channel.online')}</option>
                      <option value="xiaohongshu">{t('channel.xiaohongshu')}</option>
                      <option value="jd">{t('channel.jd')}</option>
                      <option value="taobao">{t('channel.taobao')}</option>
                      <option value="douyin">{t('channel.douyin')}</option>
                      <option value="wechat">{t('channel.wechat')}</option>
                      <option value="offline">{t('channel.offline')}</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3 flex justify-end space-x-3 mt-4">
                    <button
                      onClick={handleFilterReset}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {t('reset.filters')}
                    </button>
                    <button
                      onClick={handleFilterSubmit}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {t('apply.filters')}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* 库存列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('product.details')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sku')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('total.stock')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('available.stock')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('locations')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('last.updated')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredInventory.length > 0 ? (
                      filteredInventory
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 relative">
                                  <Image
                                    src={item.productImage || '/images/placeholder.jpg'}
                                    alt={item.productName}
                                    fill
                                    className="rounded-md object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.productName}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {item.productId}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {item.sku}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {item.totalStock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className={`text-sm ${
                                  item.availableStock === 0 
                                    ? 'text-red-600 dark:text-red-400' 
                                    : item.availableStock <= item.lowStockThreshold 
                                      ? 'text-yellow-600 dark:text-yellow-400' 
                                      : 'text-green-600 dark:text-green-400'
                                }`}>
                                  {item.availableStock}
                                </span>
                                {item.availableStock <= item.lowStockThreshold && item.availableStock > 0 && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    {t('low.stock')}
                                  </span>
                                )}
                                {item.availableStock === 0 && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                    {t('out.of.stock')}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {item.locations.length} {t('locations')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {item.lastUpdated}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <InventoryActions 
                                item={item} 
                                onUpdate={() => {
                                  // In a real app, you would refresh the data
                                  console.log('Inventory updated');
                                  // Optionally refresh the data
                                  // setFilteredInventory([...filteredInventory]);
                                }} 
                              />
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          {t('no.inventory.found')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* 分页 */}
              <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredInventory.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'channels' && (
          <div className="space-y-6">
            {/* 渠道库存同步状态 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{t('channel.sync.status')}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  {t('sync.now')}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('channel')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('last.sync')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('sync.status')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {t('channel.taobao')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2023-06-25 18:30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {t('sync.success')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          {t('view.details')}
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('sync')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {t('channel.jd')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2023-06-25 17:45
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {t('sync.success')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          {t('view.details')}
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('sync')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {t('channel.xiaohongshu')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2023-06-25 16:15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          {t('sync.partial')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          {t('view.details')}
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('sync')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {t('channel.douyin')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        2023-06-25 12:30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          {t('sync.failed')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          {t('view.details')}
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('sync')}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* 渠道库存分配功能 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">{t('channel.allocation')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('channel.allocation.desc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    {t('allocate.inventory')}
                  </button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">{t('channel.thresholds')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('channel.thresholds.desc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    {t('set.channel.thresholds')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 渠道库存报表 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t('channel.inventory.report')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('channel.inventory.report.desc')}
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                {t('generate.report')}
              </button>
            </div>
          </div>
        )}

        {activeSection === 'activity' && (
          <div className="space-y-6">
            {/* 库存活动日志 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{t('inventory.activity.log')}</h2>
                <div className="flex space-x-2">
                  <select className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">{t('all.activities')}</option>
                    <option value="adjustment">{t('stock.adjustment')}</option>
                    <option value="transfer">{t('stock.transfer')}</option>
                    <option value="order">{t('order.fulfillment')}</option>
                    <option value="return">{t('return.processing')}</option>
                  </select>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    {t('export')}
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                        {t('date.time')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {t('activity.type')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {t('product')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {t('quantity')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {t('location')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {t('user')}
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">{t('actions')}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6">
                        2023-06-28 14:32
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {t('stock.adjustment')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        Tabby 26 手提包
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        +5
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('online.warehouse')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        张经理
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('view.details')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6">
                        2023-06-27 11:15
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {t('stock.transfer')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        Willow 手提包
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        -3
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('online.warehouse')} → {t('beijing.flagship.store')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        李库管
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('view.details')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6">
                        2023-06-26 09:45
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          {t('order.fulfillment')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        Tabby 26 手提包
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        -1
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('shanghai.store')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        王店长
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('view.details')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6">
                        2023-06-25 16:20
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          {t('return.processing')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        Kira 链条包
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        +1
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('online.warehouse')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        赵客服
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('view.details')}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Pagination
                  currentPage={1}
                  totalPages={5}
                  onPageChange={() => {}}
                />
              </div>
            </div>
            
            {/* 库存调整表单 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t('quick.inventory.adjustment')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="adjustProduct" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('product')}
                  </label>
                  <select
                    id="adjustProduct"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">{t('select.product')}</option>
                    <option value="prod1">Tabby 26 手提包</option>
                    <option value="prod2">Willow 手提包</option>
                    <option value="prod3">Kira 链条包</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="adjustLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('location')}
                  </label>
                  <select
                    id="adjustLocation"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">{t('select.location')}</option>
                    <option value="online-main">{t('online.warehouse')}</option>
                    <option value="store-beijing">{t('beijing.flagship.store')}</option>
                    <option value="store-shanghai">{t('shanghai.store')}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="adjustQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('quantity')}
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm">
                      +/-
                    </span>
                    <input
                      type="number"
                      id="adjustQuantity"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="adjustReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('reason')}
                  </label>
                  <select
                    id="adjustReason"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">{t('select.reason')}</option>
                    <option value="count">{t('physical.count')}</option>
                    <option value="damage">{t('damaged.goods')}</option>
                    <option value="return">{t('customer.return')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="adjustNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('notes')}
                  </label>
                  <textarea
                    id="adjustNotes"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={t('enter.notes')}
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    {t('submit.adjustment')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}