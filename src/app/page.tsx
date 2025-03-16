'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { getTranslations } from "./utils/translations";
import { useLanguage } from './contexts/LanguageContext';
import StatusBadge from './components/StatusBadge';

// 图表组件（如果需要可以使用 recharts 或其他图表库）
const SalesChart = () => {
  return (
    <div className="h-64 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080]">销售趋势</h3>
        <select className="coach-input text-sm py-1">
          <option>最近7天</option>
          <option>最近30天</option>
          <option>最近90天</option>
        </select>
      </div>
      
      {/* 这里是图表的占位符，实际项目中应该使用图表库 */}
      <div className="h-40 flex items-end space-x-2">
        <div className="h-20 w-full bg-[#6B4423]/10 dark:bg-[#6B4423]/30 rounded-t-md"></div>
        <div className="h-32 w-full bg-[#6B4423]/20 dark:bg-[#6B4423]/40 rounded-t-md"></div>
        <div className="h-24 w-full bg-[#6B4423]/30 dark:bg-[#6B4423]/50 rounded-t-md"></div>
        <div className="h-36 w-full bg-[#6B4423]/40 dark:bg-[#6B4423]/60 rounded-t-md"></div>
        <div className="h-28 w-full bg-[#6B4423]/50 dark:bg-[#6B4423]/70 rounded-t-md"></div>
        <div className="h-40 w-full bg-[#6B4423]/60 dark:bg-[#6B4423]/80 rounded-t-md"></div>
        <div className="h-30 w-full bg-[#6B4423]/70 dark:bg-[#6B4423]/90 rounded-t-md"></div>
      </div>
    </div>
  );
};

// 渠道分布图表
const ChannelDistributionChart = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080]">全渠道分布</h3>
        <select className="coach-input text-sm py-1">
          <option>按订单数</option>
          <option>按销售额</option>
        </select>
      </div>
      
      {/* 渠道分布图表占位符 */}
      <div className="flex items-center justify-center h-40">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border-8 border-[#6B4423]/70 dark:border-[#6B4423]/90"></div>
          <div className="absolute inset-0 rounded-full border-8 border-t-[#D4AF37] border-r-[#D4AF37] border-b-transparent border-l-transparent"></div>
          <div className="absolute inset-4 rounded-full border-8 border-t-[#800020] border-r-transparent border-b-transparent border-l-transparent"></div>
          <div className="absolute inset-8 rounded-full bg-[#F5EFE0] dark:bg-neutral-700 flex items-center justify-center">
            <span className="text-sm font-bold text-[#6B4423] dark:text-[#C3A080]">全渠道</span>
          </div>
        </div>
        
        <div className="ml-6">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-[#6B4423]/70 dark:bg-[#6B4423]/90 mr-2"></div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">线下门店 (45%)</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-[#D4AF37] mr-2"></div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">官方网站 (35%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#800020] mr-2"></div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">第三方平台 (20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: '$0',
    averageOrderValue: '$0'
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  
  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setStats({
        totalOrders: 1248,
        pendingOrders: 42,
        totalRevenue: '$124,856.00',
        averageOrderValue: '$99.88'
      });
      
      setRecentOrders([
        { id: 'ORD-1001', customer: '张三', date: '2023-06-15', status: '已完成', total: '$299.99', channel: '线下门店' },
        { id: 'ORD-1002', customer: '李四', date: '2023-06-14', status: '处理中', total: '$149.50', channel: '官方网站' },
        { id: 'ORD-1003', customer: '王五', date: '2023-06-14', status: '待处理', total: '$89.99', channel: '小红书' },
        { id: 'ORD-1004', customer: '赵六', date: '2023-06-13', status: '已发货', total: '$199.99', channel: '京东' },
        { id: 'ORD-1005', customer: '钱七', date: '2023-06-12', status: '已取消', total: '$59.99', channel: '线下门店' },
      ]);
      
      setTopProducts([
        { id: 'PROD-001', name: 'Coach 经典手提包', sku: 'SKU-12345', sold: 124, revenue: '$37,198.76' },
        { id: 'PROD-002', name: 'Kate Spade 真皮钱包', sku: 'SKU-67890', sold: 98, revenue: '$9,799.02' },
        { id: 'PROD-003', name: 'Stuart Weitzman 高跟鞋', sku: 'SKU-24680', sold: 87, revenue: '$13,049.13' },
        { id: 'PROD-004', name: 'Coach 腰带', sku: 'SKU-13579', sold: 76, revenue: '$6,839.24' },
      ]);
      
      setLoading(false);
    }, 1500);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-[#F5EFE0] dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* 品牌标题骨架屏 */}
            <div className="text-center mb-12">
              <div className="h-10 bg-[#C3A080]/20 rounded w-1/3 mx-auto mb-2"></div>
              <div className="h-4 bg-[#C3A080]/20 rounded w-1/2 mx-auto mb-6"></div>
              <div className="h-6 bg-[#C3A080]/20 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-[#C3A080]/20 rounded w-1/3 mx-auto"></div>
            </div>
            
            {/* 统计卡片骨架屏 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20">
                  <div className="h-5 bg-[#C3A080]/20 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-[#C3A080]/20 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#C3A080]/20 rounded w-1/3"></div>
                </div>
              ))}
            </div>
            
            {/* 图表骨架屏 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="h-64 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
                <div className="h-6 bg-[#C3A080]/20 rounded w-1/4 mb-4"></div>
                <div className="h-40 bg-[#C3A080]/10 rounded"></div>
              </div>
              <div className="h-64 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
                <div className="h-6 bg-[#C3A080]/20 rounded w-1/4 mb-4"></div>
                <div className="h-40 bg-[#C3A080]/10 rounded"></div>
              </div>
            </div>
            
            {/* 表格骨架屏 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
                <div className="h-6 bg-[#C3A080]/20 rounded w-1/4 mb-4"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#C3A080]/10 rounded mb-2"></div>
                ))}
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
                <div className="h-6 bg-[#C3A080]/20 rounded w-1/4 mb-4"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#C3A080]/10 rounded mb-2"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-6 bg-[#F5EFE0] dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* 品牌标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#6B4423] dark:text-[#C3A080] mb-2">TAPESTRY</h1>
          <p className="text-lg text-[#6B4423]/80 dark:text-[#C3A080]/80 mb-6 font-medium">Coach · Kate Spade · Stuart Weitzman</p>
          <h2 className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mb-2">全渠道订单管理系统 (OMS)</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            高效管理线上线下全渠道订单处理、库存协同与物流配送，提供无缝购物体验
          </p>
        </div>
        
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20 hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{t('total.orders')}</h2>
            <p className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mb-1">{stats.totalOrders}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">+12% {t('from.last.month')}</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20 hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{t('pending.orders')}</h2>
            <p className="text-2xl font-bold text-[#CD7F32] dark:text-[#E0B87A] mb-1">{stats.pendingOrders}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">-5% {t('from.last.month')}</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20 hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{t('total.revenue')}</h2>
            <p className="text-2xl font-bold text-[#4D7C4D] dark:text-[#8FBF8F] mb-1">{stats.totalRevenue}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">+8% {t('from.last.month')}</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20 hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{t('avg.order.value')}</h2>
            <p className="text-2xl font-bold text-[#4A6FA5] dark:text-[#8EAFD4] mb-1">{stats.averageOrderValue}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">+2% {t('from.last.month')}</p>
          </div>
        </div>
        
        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 销售图表 */}
          <SalesChart />
          
          {/* 渠道分布图表 */}
          <ChannelDistributionChart />
        </div>
        
        {/* 最近订单和热销产品 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近订单 */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080]">{t('recent.orders')}</h3>
              <Link href="/orders" className="text-sm text-[#6B4423] dark:text-[#C3A080] hover:underline">
                {t('view.all')}
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-neutral-600 dark:text-neutral-400 border-b border-[#C3A080]/20 dark:border-neutral-700">
                  <tr>
                    <th className="px-4 py-2 text-left">{t('order.id')}</th>
                    <th className="px-4 py-2 text-left">{t('channel')}</th>
                    <th className="px-4 py-2 text-left">{t('status')}</th>
                    <th className="px-4 py-2 text-right">{t('total')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A080]/10 dark:divide-neutral-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F5EFE0]/30 dark:hover:bg-neutral-700/30">
                      <td className="px-4 py-3">
                        <Link href={`/orders/${order.id}`} className="text-sm font-medium text-[#6B4423] dark:text-[#C3A080] hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">{order.channel}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#6B4423] dark:text-[#C3A080]">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 热销产品 */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 border border-[#C3A080]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080]">{t('top.products')}</h3>
              <Link href="/products" className="text-sm text-[#6B4423] dark:text-[#C3A080] hover:underline">
                {t('view.all')}
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-neutral-600 dark:text-neutral-400 border-b border-[#C3A080]/20 dark:border-neutral-700">
                  <tr>
                    <th className="px-4 py-2 text-left">{t('product')}</th>
                    <th className="px-4 py-2 text-center">{t('sold')}</th>
                    <th className="px-4 py-2 text-right">{t('revenue')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A080]/10 dark:divide-neutral-700">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#F5EFE0]/30 dark:hover:bg-neutral-700/30">
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-[#6B4423] dark:text-[#C3A080]">{product.name}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-500">{product.sku}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-neutral-600 dark:text-neutral-400">{product.sold}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#6B4423] dark:text-[#C3A080]">{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* 全渠道功能区 */}
        <div className="mt-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20">
          <h3 className="text-xl font-medium text-[#6B4423] dark:text-[#C3A080] mb-4">全渠道订单管理优势</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-[#C3A080]/20 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-[#6B4423] dark:text-[#C3A080] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h4 className="font-medium text-[#6B4423] dark:text-[#C3A080]">统一订单视图</h4>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                整合线上线下所有渠道订单，提供统一管理界面，实现全渠道订单可视化
              </p>
            </div>
            
            <div className="p-4 border border-[#C3A080]/20 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-[#6B4423] dark:text-[#C3A080] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <h4 className="font-medium text-[#6B4423] dark:text-[#C3A080]">库存协同</h4>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                实时同步各渠道库存信息，避免超卖，优化库存分配，提高周转率
              </p>
            </div>
            
            <div className="p-4 border border-[#C3A080]/20 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-[#6B4423] dark:text-[#C3A080] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h4 className="font-medium text-[#6B4423] dark:text-[#C3A080]">客户体验</h4>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                支持线上购买门店取货、门店退换线上订单等全渠道服务，提升客户满意度
              </p>
            </div>
          </div>
        </div>
        
        {/* 快速操作按钮 */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/orders/new" className="btn-primary flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            {t('new.order')}
          </Link>
          
          <Link href="/products/new" className="btn-secondary flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            {t('new.product')}
          </Link>
          
          <button className="btn-outline flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('export.report')}
          </button>
        </div>
      </div>
    </div>
  );
}
