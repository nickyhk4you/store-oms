'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import StatusBadge from '../../components/StatusBadge';

// 获取渠道对应的图标
function getChannelIcon(channel: string): React.ReactElement {
  // 根据渠道名称返回对应的图标
  const iconClass = "w-5 h-5 text-[#6B4423] dark:text-[#C3A080]";
  
  switch (channel.toLowerCase()) {
    case '小红书':
    case 'xiaohongshu':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{channel}</span>
        </div>
      );
    case '京东':
    case 'jd.com':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
          </svg>
          <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{channel}</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{channel}</span>
        </div>
      );
  }
}

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟加载订单数据
    setTimeout(() => {
      // 这里应该是从API获取订单数据
      const mockOrder = {
        id: id,
        orderNumber: `ORD-${id}`,
        customer: {
          name: language === 'zh' ? '张三' : 'John Doe',
          email: 'customer@example.com',
          phone: '123-456-7890',
          address: language === 'zh' ? '北京市海淀区中关村大街1号' : '123 Main St, New York, NY 10001',
        },
        date: '2023-05-15',
        status: language === 'zh' ? '处理中' : 'Processing',
        channel: language === 'zh' ? '小红书' : 'Xiaohongshu',
        paymentMethod: language === 'zh' ? '信用卡' : 'Credit Card',
        shippingMethod: language === 'zh' ? '标准配送' : 'Standard Shipping',
        items: [
          {
            id: 'item-1',
            productId: 'prod-001',
            productName: language === 'zh' ? 'Coach 经典手提包' : 'Coach Classic Handbag',
            sku: 'SKU-12345',
            quantity: 1,
            price: '$299.99',
            total: '$299.99',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
          {
            id: 'item-2',
            productId: 'prod-002',
            productName: language === 'zh' ? 'Coach 真皮钱包' : 'Coach Leather Wallet',
            sku: 'SKU-67890',
            quantity: 2,
            price: '$99.99',
            total: '$199.98',
            image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
        ],
        subtotal: '$499.97',
        shipping: '$9.99',
        tax: '$40.00',
        total: '$549.96',
        notes: language === 'zh' ? '客户要求礼品包装' : 'Customer requested gift wrapping',
      };
      
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  }, [id, language]);
  
  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#F5EFE0] dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-[#C3A080]/20 rounded w-1/4 mb-6"></div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <div className="h-6 bg-[#C3A080]/20 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-4 bg-[#C3A080]/20 rounded w-3/4"></div>
                  <div className="h-4 bg-[#C3A080]/20 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-4 bg-[#C3A080]/20 rounded w-2/3"></div>
                  <div className="h-4 bg-[#C3A080]/20 rounded w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen p-8 bg-[#F5EFE0] dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mb-4">{t('order.not.found')}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">{t('order.not.found.message')}</p>
          <Link href="/orders" className="btn-primary">
            {t('back.to.orders')}
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8 bg-[#F5EFE0] dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()} 
            className="mr-4 text-[#6B4423] dark:text-[#C3A080] hover:text-[#5A381D] dark:hover:text-[#D4AF37]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080]">
            {t('order.details')}: {order.id}
          </h1>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden mb-6 border border-[#C3A080]/20">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-2">{t('order.info')}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('order.number')}: {order.orderNumber}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('date')}: {order.date}</p>
                <div className="mt-2">
                  <StatusBadge status={order.status} />
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-2">{t('channel.info')}</h2>
                <div className="mb-2">
                  {getChannelIcon(order.channel)}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('payment.method')}: {order.paymentMethod}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('shipping.method')}: {order.shippingMethod}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-2">{t('customer.info')}</h2>
                <div className="bg-[#F5EFE0]/50 dark:bg-neutral-700/30 p-4 rounded-md">
                  <p className="text-sm font-medium">{order.customer.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{order.customer.email}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{order.customer.phone}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-2">{t('shipping.address')}</h2>
                <div className="bg-[#F5EFE0]/50 dark:bg-neutral-700/30 p-4 rounded-md">
                  <p className="text-sm">{order.customer.address}</p>
                </div>
              </div>
            </div>
            
            {order.notes && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-2">{t('notes')}</h2>
                <div className="bg-[#F5EFE0]/50 dark:bg-neutral-700/30 p-4 rounded-md">
                  <p className="text-sm italic">{order.notes}</p>
                </div>
              </div>
            )}
            
            <h2 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080] mb-4">{t('order.items')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5EFE0] dark:bg-neutral-700 text-xs uppercase text-[#6B4423] dark:text-[#C3A080]">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('product')}</th>
                    <th className="px-4 py-3 text-center">{t('quantity')}</th>
                    <th className="px-4 py-3 text-right">{t('price')}</th>
                    <th className="px-4 py-3 text-right">{t('total')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A080]/10 dark:divide-neutral-700">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F5EFE0]/30 dark:hover:bg-neutral-700/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-[#C3A080]/20">
                            <img src={item.image} alt={item.productName} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#6B4423] dark:text-[#C3A080]">{item.productName}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-neutral-600 dark:text-neutral-400">{item.quantity}</td>
                      <td className="px-4 py-4 text-right text-sm text-neutral-600 dark:text-neutral-400">{item.price}</td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-[#6B4423] dark:text-[#C3A080]">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 border-t border-[#C3A080]/20 dark:border-neutral-700 pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600 dark:text-neutral-400">{t('subtotal')}</span>
                <span className="text-neutral-600 dark:text-neutral-400">{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600 dark:text-neutral-400">{t('shipping')}</span>
                <span className="text-neutral-600 dark:text-neutral-400">{order.shipping}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-neutral-600 dark:text-neutral-400">{t('tax')}</span>
                <span className="text-neutral-600 dark:text-neutral-400">{order.tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6B4423] dark:text-[#C3A080]">{t('total')}</span>
                <span className="font-bold text-lg text-[#6B4423] dark:text-[#C3A080]">{order.total}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <button className="btn-outline">
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {t('print')}
            </button>
            <button className="btn-outline">
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {t('export')}
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="btn-secondary">
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t('edit')}
            </button>
            <button className="btn-primary">
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t('update.status')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 