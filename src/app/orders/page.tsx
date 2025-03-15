'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import OrderSearch, { OrderFilters } from "../components/OrderSearch";
import Pagination from "../components/Pagination";

// 模拟订单数据 - 扩展更多数据用于分页演示
const generateOrders = (language: string, count: number) => {
  const zhCustomers = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二'];
  const enCustomers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Sarah Wilson', 'David Miller', 'Lisa Taylor', 'James Anderson', 'Patricia Thomas'];
  
  const zhStatuses = ['已完成', '处理中', '待处理', '已发货'];
  const enStatuses = ['Completed', 'Processing', 'Pending', 'Shipped'];
  
  // 添加渠道数据
  const zhChannels = ['小红书', '京东', '淘宝', '抖音', '微信小程序', '线下门店', '其他'];
  const enChannels = ['Xiaohongshu', 'JD.com', 'Taobao', 'Douyin', 'WeChat Mini Program', 'Offline Store', 'Other'];
  
  const orders = [];
  
  for (let i = 1; i <= count; i++) {
    const id = `ORD-${(1000 + i).toString().padStart(3, '0')}`;
    const randomCustomerIndex = Math.floor(Math.random() * 10);
    const randomStatusIndex = Math.floor(Math.random() * 4);
    const randomChannelIndex = Math.floor(Math.random() * 7); // 随机渠道
    
    // 生成随机日期 (过去30天内)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    // 生成随机金额
    const amount = Math.floor(Math.random() * 10000) / 100;
    
    if (language === 'zh') {
      orders.push({
        id,
        customer: zhCustomers[randomCustomerIndex],
        date: formattedDate,
        status: zhStatuses[randomStatusIndex],
        channel: zhChannels[randomChannelIndex], // 添加渠道
        total: `¥${amount.toFixed(2)}`
      });
    } else {
      orders.push({
        id,
        customer: enCustomers[randomCustomerIndex],
        date: formattedDate,
        status: enStatuses[randomStatusIndex],
        channel: enChannels[randomChannelIndex], // 添加渠道
        total: `$${amount.toFixed(2)}`
      });
    }
  }
  
  return orders;
};

export default function OrdersPage() {
  const { language, t } = useLanguage();
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  useEffect(() => {
    // 生成模拟订单数据
    const generatedOrders = generateOrders(language, 100);
    setOrders(generatedOrders);
    setFilteredOrders(generatedOrders);
  }, [language]);
  
  const handleSearch = (filters: OrderFilters) => {
    let results = [...orders];
    
    if (filters.orderId) {
      results = results.filter(order => 
        order.id.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    }
    
    if (filters.customerName) {
      results = results.filter(order => 
        order.customer.toLowerCase().includes(filters.customerName.toLowerCase())
      );
    }
    
    if (filters.status) {
      results = results.filter(order => order.status === filters.status);
    }
    
    if (filters.channel) {
      results = results.filter(order => order.channel === filters.channel);
    }
    
    if (filters.startDate) {
      results = results.filter(order => order.date >= filters.startDate);
    }
    
    if (filters.endDate) {
      results = results.filter(order => order.date <= filters.endDate);
    }
    
    setFilteredOrders(results);
    setCurrentPage(1); // 重置到第一页
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 获取当前页的订单
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  
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
  
  // 获取渠道图标的辅助函数
  function getChannelIcon(channel: string) {
    const zhToEn: {[key: string]: string} = {
      '小红书': 'Xiaohongshu',
      '京东': 'JD.com',
      '淘宝': 'Taobao',
      '抖音': 'Douyin',
      '微信小程序': 'WeChat Mini Program',
      '线下门店': 'Offline Store',
      '其他': 'Other'
    };
    
    const channelName = language === 'zh' ? zhToEn[channel] || channel : channel;
    
    switch (channelName) {
      case 'Xiaohongshu':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            {channel}
          </span>
        );
      case 'JD.com':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case 'Taobao':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case 'Douyin':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-black text-white">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case 'WeChat Mini Program':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case 'Offline Store':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {channel}
          </span>
        );
    }
  }
  
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('orders')}</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
            {t('new.order')}
          </button>
        </div>
        
        <OrderSearch onSearch={handleSearch} />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {filteredOrders.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left">{t('order.id')}</th>
                      <th className="px-6 py-3 text-left">{t('customer')}</th>
                      <th className="px-6 py-3 text-left">{t('channel')}</th>
                      <th className="px-6 py-3 text-left">{t('date')}</th>
                      <th className="px-6 py-3 text-left">{t('status')}</th>
                      <th className="px-6 py-3 text-right">{t('total')}</th>
                      <th className="px-6 py-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {currentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getChannelIcon(order.channel)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4">
                            {t('view')}
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            {t('edit')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
                totalItems={filteredOrders.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {t('no.results')}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 