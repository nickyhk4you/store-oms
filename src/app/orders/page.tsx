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
  
  const orders = [];
  
  for (let i = 1; i <= count; i++) {
    const id = `ORD-${i.toString().padStart(3, '0')}`;
    const randomCustomerIndex = Math.floor(Math.random() * 10);
    const randomStatusIndex = Math.floor(Math.random() * 4);
    
    // 生成随机日期 (过去90天内)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    // 生成随机金额
    const amount = Math.floor(Math.random() * 10000) / 100;
    
    if (language === 'zh') {
      orders.push({
        id,
        customer: zhCustomers[randomCustomerIndex],
        date: formattedDate,
        status: zhStatuses[randomStatusIndex],
        total: `¥${amount.toFixed(2)}`,
        rawAmount: amount
      });
    } else {
      orders.push({
        id,
        customer: enCustomers[randomCustomerIndex],
        date: formattedDate,
        status: enStatuses[randomStatusIndex],
        total: `$${(amount / 6.8).toFixed(2)}`,
        rawAmount: amount / 6.8
      });
    }
  }
  
  return orders;
};

export default function OrdersPage() {
  const { language, t } = useLanguage();
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // 当语言变化时重新生成订单数据
  useEffect(() => {
    const orders = generateOrders(language, 50);
    setAllOrders(orders);
    setFilteredOrders(orders);
    setCurrentPage(1);
  }, [language]);
  
  // 处理搜索
  const handleSearch = (filters: OrderFilters) => {
    let results = [...allOrders];
    
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
      const statusMap: Record<string, string> = {
        'completed': language === 'zh' ? '已完成' : 'Completed',
        'processing': language === 'zh' ? '处理中' : 'Processing',
        'pending': language === 'zh' ? '待处理' : 'Pending',
        'shipped': language === 'zh' ? '已发货' : 'Shipped'
      };
      
      results = results.filter(order => 
        order.status === statusMap[filters.status]
      );
    }
    
    if (filters.startDate) {
      results = results.filter(order => 
        new Date(order.date) >= new Date(filters.startDate)
      );
    }
    
    if (filters.endDate) {
      results = results.filter(order => 
        new Date(order.date) <= new Date(filters.endDate)
      );
    }
    
    setFilteredOrders(results);
    setCurrentPage(1);
  };
  
  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 获取当前页的订单
  const getCurrentOrders = () => {
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

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('orders')}</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            {t('new.order')}
          </button>
        </div>

        <OrderSearch onSearch={handleSearch} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {filteredOrders.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('order.id')}
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('customer')}
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('date')}
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('status')}
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('total')}
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {getCurrentOrders().map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <Link 
                              href={`/orders/${order.id}`}
                              className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                            >
                              {t('view')}
                            </Link>
                            <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                              {t('edit')}
                            </button>
                          </div>
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