'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import Pagination from "../components/Pagination";
import Image from "next/image";
// 导入图表相关组件
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

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
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('inventory.management')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('inventory.management.desc')}</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t('add.inventory')}
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
              </svg>
              {t('import.inventory')}
            </button>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t('export.inventory')}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              {t('inventory.report')}
            </button>
            <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {t('manage.alerts')}
            </button>
          </div>
        </div>
        
        {/* 库存搜索部分 */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('filter.inventory')}</h2>
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center"
            >
              {isFilterExpanded ? t('collapse') : t('expand')}
              <svg className={`w-4 h-4 ml-1 transform ${isFilterExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          
          {isFilterExpanded && (
            <form onSubmit={handleFilterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('product.id')}
                  </label>
                  <input
                    type="text"
                    name="productId"
                    value={filters.productId}
                    onChange={handleFilterChange}
                    placeholder={t('enter.product.id')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('product.name')}
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={filters.productName}
                    onChange={handleFilterChange}
                    placeholder={t('enter.product.name')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('sku')}
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={filters.sku}
                    onChange={handleFilterChange}
                    placeholder={t('enter.sku')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('location')}
                  </label>
                  <select
                    name="locationId"
                    value={filters.locationId}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('stock.status')}
                  </label>
                  <select
                    name="stockStatus"
                    value={filters.stockStatus}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">{t('all.statuses')}</option>
                    <option value="in">{t('in.stock')}</option>
                    <option value="low">{t('low.stock')}</option>
                    <option value="out">{t('out.of.stock')}</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
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
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleFilterReset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  {t('reset')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  {t('search')}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* 库存标签页和表格 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleTabChange(0)}
              className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                selectedTab === 0
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('all.inventory')}
            </button>
            <button
              onClick={() => handleTabChange(1)}
              className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                selectedTab === 1
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('online.inventory')}
            </button>
            <button
              onClick={() => handleTabChange(2)}
              className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                selectedTab === 2
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('offline.inventory')}
            </button>
          </div>
          
          <div className="p-6">
            {/* 显示当前选中的标签内容 */}
            {filteredInventory.length > 0 ? (
              <>
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
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                {item.productImage ? (
                                  <Image
                                    src={item.productImage}
                                    alt={item.productName}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 object-cover"
                                  />
                                ) : (
                                  <div className="h-10 w-10 flex items-center justify-center">
                                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                  </div>
                                )}
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
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.availableStock === 0
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                : item.availableStock <= item.lowStockThreshold
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            }`}>
                              {item.availableStock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col space-y-1">
                              {item.locations.map(loc => (
                                <div key={loc.id} className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-1 ${loc.type === 'online' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                  <span>{loc.name}: {loc.stock}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.lastUpdated}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/inventory/${item.id}`} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3">
                              {t('view')}
                            </Link>
                            <button className="text-green-600 hover:text-green-900 dark:hover:text-green-400 mr-3">
                              {t('adjust')}
                            </button>
                            <button className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400">
                              {t('transfer')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredInventory.length / itemsPerPage)}
                  totalItems={filteredInventory.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                {t('no.inventory.found')}
              </div>
            )}
          </div>
        </div>
        
        {/* 库存统计和警报 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('inventory.summary')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('total.products')}</div>
                <div className="text-2xl font-bold">{inventoryData.length}</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('total.inventory.value')}</div>
                <div className="text-2xl font-bold">¥1,245,680</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('online.stock.value')}</div>
                <div className="text-2xl font-bold">¥845,320</div>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('offline.stock.value')}</div>
                <div className="text-2xl font-bold">¥400,360</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('inventory.alerts')}</h2>
            <div className="space-y-4">
              <div className="p-4 border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <div className="flex items-center text-yellow-800 dark:text-yellow-300 font-medium mb-2">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {t('low.stock.alert')}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3 {t('products.low.stock')}
                </p>
              </div>
              
              <div className="p-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <div className="flex items-center text-red-800 dark:text-red-300 font-medium mb-2">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {t('out.of.stock.alert')}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 {t('products.out.of.stock')}
                </p>
              </div>
              
              <div className="p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-center text-blue-800 dark:text-blue-300 font-medium mb-2">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  {t('inventory.transfer.needed')}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2 {t('products.need.transfer')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 最近库存活动 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('recent.inventory.activity')}</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('stock.received')}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('received.items', { count: 15 })} - Tabby 26 手提包 (+10), Willow 托特包 (+5)
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  2023-06-25 14:30
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <svg className="h-5 w-5 text-purple-600 dark:text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('stock.transferred')}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('transferred.items', { from: t('online.warehouse'), to: t('beijing.flagship.store'), count: 8 })}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  2023-06-24 10:15
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <svg className="h-5 w-5 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('stock.adjusted')}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('adjusted.items', { reason: t('inventory.count'), count: 3 })}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  2023-06-23 16:45
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-right">
            <Link href="/inventory/activity" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              {t('view.all.activity')} →
            </Link>
          </div>
        </div>
        
        {/* 增强的渠道库存分析区域 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">{t('channel.inventory.analysis')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 库存分布饼图 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 text-center">{t('inventory.distribution')}</h3>
              <div className="h-64 flex items-center justify-center">
                <Pie data={channelInventoryData} options={pieOptions} />
              </div>
            </div>
            
            {/* 库存周转率图表 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 text-center">{t('inventory.turnover.rate')}</h3>
              <div className="h-64 flex items-center justify-center">
                <Bar data={turnoverRateData} options={horizontalBarOptions} />
              </div>
            </div>
          </div>
          
          {/* 库存趋势图表 */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium mb-4 text-center">{t('inventory.trend.by.channel')}</h3>
            <div className="h-80">
              <Bar data={inventoryTrendData} options={barOptions} />
            </div>
          </div>
          
          {/* 渠道表现指标 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3">{t('channel.performance')}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.taobao')}</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.jd')}</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">55%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.offline')}</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('channel.xiaohongshu')}</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3">{t('inventory.efficiency')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('avg.days.in.inventory')}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">24.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.turnover.rate.annual')}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">3.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.accuracy')}</span>
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('stockout.rate')}</span>
                  <span className="text-lg font-semibold text-red-600 dark:text-red-400">2.3%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3">{t('inventory.insights')}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {t('inventory.insight.1')}
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
        
        {/* 添加渠道库存同步状态区域 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('channel.sync.status')}</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
        
        {/* 添加渠道库存分配功能按钮 */}
        <div className="flex space-x-4 mb-6">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            {t('allocate.inventory')}
          </button>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {t('set.channel.thresholds')}
          </button>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            {t('channel.inventory.report')}
          </button>
        </div>
      </main>
    </div>
  );
}