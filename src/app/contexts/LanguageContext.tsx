'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// 创建一个类型安全的索引签名
interface Translations {
  [key: string]: string;
}

interface TranslationSet {
  zh: Translations;
  en: Translations;
}

const translations: TranslationSet = {
  zh: {
    // 通用
    'language': '语言',
    'chinese': '中文',
    'english': '英文',
    
    // 首页
    'oms.title': '订单管理系统',
    'oms.subtitle': '高效管理订单处理和库存跟踪',
    'order.management': '订单管理',
    'order.management.desc': '查看、处理和跟踪所有客户订单。',
    'view.orders': '查看订单',
    'dashboard': '数据统计',
    'dashboard.desc': '通过实时分析获取业务洞察。',
    'view.dashboard': '查看统计',
    'quick.stats': '快速统计',
    'pending.orders': '待处理订单',
    'completed.today': '今日完成',
    'total.revenue': '总收入',
    'avg.processing.time': '平均处理时间',
    'days': '天',
    
    // 订单列表页
    'orders': '订单管理',
    'filter': '筛选',
    'new.order': '新建订单',
    'order.id': '订单编号',
    'customer': '客户',
    'date': '日期',
    'status': '状态',
    'total': '总金额',
    'actions': '操作',
    'view': '查看',
    'edit': '编辑',
    'showing': '显示',
    'to': '到',
    'of': '共',
    'results': '条结果',
    'previous': '上一页',
    'next': '下一页',
    
    // 订单状态
    'status.completed': '已完成',
    'status.processing': '处理中',
    'status.pending': '待处理',
    'status.shipped': '已发货',
    
    // 订单详情页
    'back.to.orders': '返回订单列表',
    'order': '订单',
    'print': '打印',
    'update.status': '更新状态',
    'customer.info': '客户信息',
    'shipping.address': '收货地址',
    'order.summary': '订单摘要',
    'payment.method': '支付方式',
    'shipping.method': '配送方式',
    'order.items': '订单商品',
    'product': '商品',
    'quantity': '数量',
    'price': '单价',
    'subtotal': '小计',
    'shipping': '运费',
    'tax': '税费',
    'notes': '备注',
    'search.orders': '订单查询',
    'search': '搜索',
    'reset': '重置',
    'search.by.order.id': '按订单编号搜索',
    'search.by.customer': '按客户名称搜索',
    'customer.name': '客户名称',
    'start.date': '开始日期',
    'end.date': '结束日期',
    'all.statuses': '所有状态',
    'no.results': '没有找到匹配的订单',
    'items.per.page': '每页显示',
    'dashboard.overview': '业务概览和关键指标',
    'total.orders': '总订单数',
    'from.last.month': '相比上月',
    'avg.order.value': '平均订单金额',
    'conversion.rate': '转化率',
    'sales.trend': '销售趋势 (30天)',
    'order.status.distribution': '订单状态分布',
    'recent.orders': '最近订单',
    'view.all': '查看全部',
    'performance.metrics': '性能指标',
    'return.rate': '退货率',
    'customer.satisfaction': '客户满意度',
    'home': '首页',
  },
  en: {
    // General
    'language': 'Language',
    'chinese': 'Chinese',
    'english': 'English',
    
    // Home page
    'oms.title': 'Order Management System',
    'oms.subtitle': 'Efficiently manage order processing and inventory tracking',
    'order.management': 'Order Management',
    'order.management.desc': 'View, process, and track all customer orders.',
    'view.orders': 'View Orders',
    'dashboard': 'Dashboard',
    'dashboard.desc': 'Get business insights through real-time analytics.',
    'view.dashboard': 'View Dashboard',
    'quick.stats': 'Quick Stats',
    'pending.orders': 'Pending Orders',
    'completed.today': 'Completed Today',
    'total.revenue': 'Total Revenue',
    'avg.processing.time': 'Avg. Processing Time',
    'days': 'days',
    
    // Orders list page
    'orders': 'Orders',
    'filter': 'Filter',
    'new.order': 'New Order',
    'order.id': 'Order ID',
    'customer': 'Customer',
    'date': 'Date',
    'status': 'Status',
    'total': 'Total',
    'actions': 'Actions',
    'view': 'View',
    'edit': 'Edit',
    'showing': 'Showing',
    'to': 'to',
    'of': 'of',
    'results': 'results',
    'previous': 'Previous',
    'next': 'Next',
    
    // Order statuses
    'status.completed': 'Completed',
    'status.processing': 'Processing',
    'status.pending': 'Pending',
    'status.shipped': 'Shipped',
    
    // Order details page
    'back.to.orders': 'Back to Orders',
    'order': 'Order',
    'print': 'Print',
    'update.status': 'Update Status',
    'customer.info': 'Customer Information',
    'shipping.address': 'Shipping Address',
    'order.summary': 'Order Summary',
    'payment.method': 'Payment Method',
    'shipping.method': 'Shipping Method',
    'order.items': 'Order Items',
    'product': 'Product',
    'quantity': 'Quantity',
    'price': 'Price',
    'subtotal': 'Subtotal',
    'shipping': 'Shipping',
    'tax': 'Tax',
    'notes': 'Notes',
    'search.orders': 'Search Orders',
    'search': 'Search',
    'reset': 'Reset',
    'search.by.order.id': 'Search by order ID',
    'search.by.customer': 'Search by customer name',
    'customer.name': 'Customer Name',
    'start.date': 'Start Date',
    'end.date': 'End Date',
    'all.statuses': 'All Statuses',
    'no.results': 'No matching orders found',
    'items.per.page': 'Items per page',
    'dashboard.overview': 'Business overview and key metrics',
    'total.orders': 'Total Orders',
    'from.last.month': 'from last month',
    'avg.order.value': 'Avg. Order Value',
    'conversion.rate': 'Conversion Rate',
    'sales.trend': 'Sales Trend (30 days)',
    'order.status.distribution': 'Order Status Distribution',
    'recent.orders': 'Recent Orders',
    'view.all': 'View All',
    'performance.metrics': 'Performance Metrics',
    'return.rate': 'Return Rate',
    'customer.satisfaction': 'Customer Satisfaction',
    'home': 'Home',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    // 从本地存储中获取语言设置，如果没有则使用默认值
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      // 如果localStorage不可用，使用默认语言
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 