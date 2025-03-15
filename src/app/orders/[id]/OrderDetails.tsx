'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  total: string;
}

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
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  notes: string;
}

interface OrderDetailsProps {
  orderData: OrderData;
}

export default function OrderDetails({ orderData: initialOrderData }: OrderDetailsProps) {
  const { t, language } = useLanguage();
  const params = useParams();
  const [orderData, setOrderData] = useState(initialOrderData);
  
  useEffect(() => {
    // Get the ID from the URL
    const id = params?.id as string;
    if (id && id !== initialOrderData.id) {
      // Update the order data with the correct ID
      setOrderData({
        ...initialOrderData,
        id,
        orderNumber: `ORD-2023-${id}`
      });
    }
  }, [params, initialOrderData]);
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t('back.to.orders')}
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('order')} #{orderData.orderNumber}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{orderData.date}</p>
            </div>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(orderData.status)}`}>
                {orderData.status}
              </span>
              <div className="ml-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  {t('update.status')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('customer.information')}</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <p className="font-medium text-gray-900 dark:text-white">{orderData.customer.name}</p>
              <p className="text-gray-600 dark:text-gray-300">{orderData.customer.email}</p>
              <p className="text-gray-600 dark:text-gray-300">{orderData.customer.phone}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{orderData.customer.address}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('order.information')}</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600 dark:text-gray-400">{t('channel')}:</p>
                <p className="text-gray-900 dark:text-white">{orderData.channel}</p>
                
                <p className="text-gray-600 dark:text-gray-400">{t('payment.method')}:</p>
                <p className="text-gray-900 dark:text-white">{orderData.paymentMethod}</p>
                
                <p className="text-gray-600 dark:text-gray-400">{t('shipping.method')}:</p>
                <p className="text-gray-900 dark:text-white">{orderData.shippingMethod}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('order.items')}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('product')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('price')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('quantity')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('total')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {orderData.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-300">{t('subtotal')}:</span>
                <span className="text-gray-900 dark:text-white font-medium">{orderData.subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-300">{t('shipping')}:</span>
                <span className="text-gray-900 dark:text-white font-medium">{orderData.shipping}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-300">{t('tax')}:</span>
                <span className="text-gray-900 dark:text-white font-medium">{orderData.tax}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-900 dark:text-white font-medium">{t('total')}:</span>
                <span className="text-gray-900 dark:text-white font-bold">{orderData.total}</span>
              </div>
            </div>
          </div>
        </div>
        
        {orderData.notes && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('notes')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{orderData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
} 