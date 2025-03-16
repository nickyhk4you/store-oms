'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import OrderSearch, { OrderFilters } from "../components/OrderSearch";
import Pagination from "../components/Pagination";
import OrderActions from "../components/orders/OrderActions";
import SplitOrderModal from "../components/orders/SplitOrderModal";
import MergeOrdersModal from "../components/orders/MergeOrdersModal";
import React from 'react';

// 获取订单状态对应的颜色类
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case '已完成':
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case '处理中':
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case '待处理':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case '已发货':
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case '已取消':
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

// 获取渠道对应的图标
function getChannelIcon(channel: string): React.ReactElement {
  // 根据渠道名称返回对应的图标
  const iconClass = "w-5 h-5 text-gray-500 dark:text-gray-400";
  
  switch (channel.toLowerCase()) {
    case '小红书':
    case 'xiaohongshu':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
    case '京东':
    case 'jd.com':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
    // 添加更多渠道的图标
    default:
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
  }
}

// 添加订单项的接口
interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  image?: string;
  warehouse?: string;
}

// 订单数据接口
interface OrderData {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  status: string;
  channel: string;
  paymentMethod: string;
  shippingMethod: string;
  // 添加门店信息
  store?: {
    id: string;
    name: string;
    location: string;
  };
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  notes?: string;
}

// 模拟订单数据 - 扩展更多数据用于分页演示
const generateOrders = (language: string, count: number) => {
  const zhCustomers = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二'];
  const enCustomers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Sarah Wilson', 'David Miller', 'Lisa Taylor', 'James Anderson', 'Patricia Thomas'];
  
  const zhStatuses = ['已完成', '处理中', '待处理', '已发货'];
  const enStatuses = ['Completed', 'Processing', 'Pending', 'Shipped'];
  
  // 添加渠道数据
  const zhChannels = ['小红书', '京东', '淘宝', '抖音', '微信小程序', '线下门店', '其他'];
  const enChannels = ['Xiaohongshu', 'JD.com', 'Taobao', 'Douyin', 'WeChat Mini Program', 'Offline Store', 'Other'];
  
  // 添加门店数据
  const zhStores = [
    { id: 'store-001', name: '北京中关村店', location: '北京市海淀区中关村大街1号' },
    { id: 'store-002', name: '上海南京路店', location: '上海市黄浦区南京东路1号' },
    { id: 'store-003', name: '广州天河城店', location: '广州市天河区天河路208号' },
    { id: 'store-004', name: '深圳华强北店', location: '深圳市福田区华强北路1号' },
    { id: 'store-005', name: '成都春熙路店', location: '成都市锦江区春熙路1号' },
  ];
  
  const enStores = [
    { id: 'store-001', name: 'Beijing Zhongguancun Store', location: '1 Zhongguancun Street, Haidian District, Beijing' },
    { id: 'store-002', name: 'Shanghai Nanjing Road Store', location: '1 East Nanjing Road, Huangpu District, Shanghai' },
    { id: 'store-003', name: 'Guangzhou Tianhe Store', location: '208 Tianhe Road, Tianhe District, Guangzhou' },
    { id: 'store-004', name: 'Shenzhen Huaqiangbei Store', location: '1 Huaqiang North Road, Futian District, Shenzhen' },
    { id: 'store-005', name: 'Chengdu Chunxi Road Store', location: '1 Chunxi Road, Jinjiang District, Chengdu' },
  ];
  
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
    
    // 使用已声明的 randomChannelIndex 变量，而不是重新声明
    const channel = language === 'zh' ? zhChannels[randomChannelIndex] : enChannels[randomChannelIndex];
    
    // 如果是线下门店渠道，添加门店信息
    let store = undefined;
    if (channel === '线下门店' || channel === 'Offline Store') {
      const randomStoreIndex = Math.floor(Math.random() * 5);
      store = language === 'zh' ? zhStores[randomStoreIndex] : enStores[randomStoreIndex];
    }
    
    // 生成订单项
    const items: OrderItem[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
      const productId = `PRODUCT-${Math.floor(Math.random() * 1000)}`;
      const productName = `商品${j + 1}`;
      const sku = `SKU-${Math.floor(Math.random() * 10000)}`;
      const quantity = Math.floor(Math.random() * 10) + 1;
      const price = (Math.random() * 100).toFixed(2);
      const total = (quantity * parseFloat(price)).toFixed(2);
      items.push({
        id: `ITEM-${Math.floor(Math.random() * 1000000)}`,
        productId,
        productName,
        sku,
        quantity,
        price,
        total,
        image: `https://example.com/image/${Math.floor(Math.random() * 1000)}.jpg`,
        warehouse: `仓库${Math.floor(Math.random() * 10) + 1}`
      });
    }
    
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const shipping = Math.floor(Math.random() * 10) + 1;
    const tax = subtotal * 0.06;
    const total = subtotal + shipping + tax;
    
    if (language === 'zh') {
      orders.push({
        id,
        orderNumber: `ORD-${(1000 + i).toString().padStart(6, '0')}`,
        customer: {
          name: zhCustomers[randomCustomerIndex],
          email: `customer${i}@example.com`,
          phone: `138${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
          address: `北京市朝阳区某某街道${Math.floor(Math.random() * 100)}号`
        },
        date: formattedDate,
        status: zhStatuses[randomStatusIndex],
        channel: channel,
        store: store,
        paymentMethod: ['支付宝', '微信支付', '银联', '货到付款'][Math.floor(Math.random() * 4)],
        shippingMethod: ['顺丰速运', '京东物流', '圆通快递', '中通快递'][Math.floor(Math.random() * 4)],
        items: items,
        subtotal: `¥${subtotal.toFixed(2)}`,
        shipping: `¥${shipping.toFixed(2)}`,
        tax: `¥${tax.toFixed(2)}`,
        total: `¥${total.toFixed(2)}`
      });
    } else {
      orders.push({
        id,
        orderNumber: `ORD-${(1000 + i).toString().padStart(6, '0')}`,
        customer: {
          name: enCustomers[randomCustomerIndex],
          email: `customer${i}@example.com`,
          phone: `555-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          address: `${Math.floor(Math.random() * 1000)} Main St, New York, NY 10001`
        },
        date: formattedDate,
        status: enStatuses[randomStatusIndex],
        channel: channel,
        store: store,
        paymentMethod: ['Credit Card', 'PayPal', 'Apple Pay', 'Cash on Delivery'][Math.floor(Math.random() * 4)],
        shippingMethod: ['Express', 'Standard', 'Economy', 'Same Day'][Math.floor(Math.random() * 4)],
        items: items,
        subtotal: `$${(subtotal / 6.8).toFixed(2)}`,
        shipping: `$${(shipping / 6.8).toFixed(2)}`,
        tax: `$${(tax / 6.8).toFixed(2)}`,
        total: `$${(total / 6.8).toFixed(2)}`
      });
    }
  }
  
  return orders;
};

export default function OrdersPage() {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<OrderFilters>({
    orderId: '',
    customerName: '',
    startDate: '',
    endDate: '',
    status: '',
    channel: '',
    storeId: ''
  });
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [allOrders, setAllOrders] = useState<OrderData[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  
  const itemsPerPage = 10;

  // 初始化订单数据
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    const orders = generateOrders(language, 50);
    setAllOrders(orders);
    setFilteredOrders(orders);
  }, [language]);

  // 处理筛选
  const handleSearch = (searchFilters: OrderFilters) => {
    setFilters(searchFilters);
    
    let results = [...allOrders];
    
    if (searchFilters.orderId) {
      results = results.filter(order => 
        order.id.toLowerCase().includes(searchFilters.orderId.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchFilters.orderId.toLowerCase())
      );
    }
    
    if (searchFilters.customerName) {
      results = results.filter(order => 
        order.customer.name.toLowerCase().includes(searchFilters.customerName.toLowerCase())
      );
    }
    
    if (searchFilters.startDate) {
      results = results.filter(order => order.date >= searchFilters.startDate);
    }
    
    if (searchFilters.endDate) {
      results = results.filter(order => order.date <= searchFilters.endDate);
    }
    
    if (searchFilters.status) {
      results = results.filter(order => order.status === searchFilters.status);
    }
    
    if (searchFilters.channel) {
      results = results.filter(order => order.channel === searchFilters.channel);
    }
    
    // 添加门店过滤
    if (searchFilters.storeId) {
      results = results.filter(order => order.store && order.store.id === searchFilters.storeId);
    }
    
    setFilteredOrders(results);
    setCurrentPage(1);
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 获取当前页的订单
  const getCurrentPageOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };
  
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
  
  // 处理订单拆分
  const handleSplitOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsSplitModalOpen(true);
  };

  // 处理订单合并
  const handleMergeOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsMergeModalOpen(true);
  };

  // 执行订单拆分
  const executeSplitOrder = (originalOrderId: string, newOrders: any[]) => {
    // 在实际应用中，这里会调用API进行订单拆分
    console.log(`拆分订单 ${originalOrderId} 为 ${newOrders.length} 个新订单`);
    
    // 模拟更新订单列表
    // 1. 找到原始订单
    const originalOrder = allOrders.find(order => order.id === originalOrderId);
    if (!originalOrder) return;
    
    // 2. 创建新订单
    const splitOrders = newOrders.map((newOrder, index) => {
      // 生成新的订单ID
      const newId = `${originalOrderId}-S${index + 1}`;
      
      // 计算新订单的总金额
      const subtotal = newOrder.items.reduce((sum: number, item: any) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + (price * item.quantity);
      }, 0);
      
      const shipping = parseFloat(originalOrder.shipping.replace(/[^0-9.]/g, '')) / newOrders.length;
      const tax = subtotal * 0.06; // 假设税率为6%
      const total = subtotal + shipping + tax;
      
      // 货币符号
      const currencySymbol = originalOrder.total.startsWith('¥') ? '¥' : '$';
      
      return {
        ...originalOrder,
        id: newId,
        orderNumber: `${originalOrder.orderNumber}-S${index + 1}`,
        items: newOrder.items,
        subtotal: `${currencySymbol}${subtotal.toFixed(2)}`,
        shipping: `${currencySymbol}${shipping.toFixed(2)}`,
        tax: `${currencySymbol}${tax.toFixed(2)}`,
        total: `${currencySymbol}${total.toFixed(2)}`,
        status: '处理中', // 新拆分的订单状态设为处理中
      };
    });
    
    // 3. 更新订单列表
    const updatedOrders = [
      ...allOrders.filter(order => order.id !== originalOrderId),
      ...splitOrders
    ];
    
    setAllOrders(updatedOrders);
    handleSearch(filters); // 重新应用筛选
    setIsSplitModalOpen(false);
  };

  // 执行订单合并
  const executeMergeOrders = (orderIds: string[], mergedOrder: any) => {
    // 在实际应用中，这里会调用API进行订单合并
    console.log(`合并 ${orderIds.length} 个订单`);
    
    // 模拟更新订单列表
    // 1. 创建新的合并订单
    const firstOrder = allOrders.find(order => order.id === orderIds[0]);
    if (!firstOrder) return;
    
    const newId = `MERGE-${Date.now().toString().substring(8)}`;
    const newOrder = {
      ...mergedOrder,
      id: newId,
      orderNumber: `MERGE-${Date.now().toString().substring(8)}`,
      status: '处理中', // 新合并的订单状态设为处理中
    };
    
    // 2. 更新订单列表
    const updatedOrders = [
      ...allOrders.filter(order => !orderIds.includes(order.id)),
      newOrder
    ];
    
    setAllOrders(updatedOrders);
    handleSearch(filters); // 重新应用筛选
    setIsMergeModalOpen(false);
  };

  // 获取当前选中的订单
  const getSelectedOrder = () => {
    return allOrders.find(order => order.id === selectedOrderId) || null;
  };

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
                      <th className="px-6 py-3 text-left">{t('store')}</th>
                      <th className="px-6 py-3 text-left">{t('date')}</th>
                      <th className="px-6 py-3 text-left">{t('status')}</th>
                      <th className="px-6 py-3 text-right">{t('total')}</th>
                      <th className="px-6 py-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {getCurrentPageOrders().map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getChannelIcon(order.channel)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.store ? order.store.name : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <OrderActions 
                            orderId={order.id}
                            onSplit={() => handleSplitOrder(order.id)}
                            onMerge={() => handleMergeOrder(order.id)}
                          />
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

      {/* 订单拆分模态框 */}
      {getSelectedOrder() && (
        <SplitOrderModal
          isOpen={isSplitModalOpen}
          onClose={() => setIsSplitModalOpen(false)}
          order={getSelectedOrder()!}
          onSplitOrder={executeSplitOrder}
        />
      )}

      {/* 订单合并模态框 */}
      <MergeOrdersModal
        isOpen={isMergeModalOpen}
        onClose={() => setIsMergeModalOpen(false)}
        orders={allOrders}
        onMergeOrders={executeMergeOrders}
      />
    </div>
  );
} 