'use client';

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

// 这是一个动态路由，将匹配如 /orders/ORD-001 的路径
export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { language, t } = useLanguage();
  const orderId = params.id;
  
  // 模拟特定订单的数据
  const zhOrder = {
    id: orderId,
    customer: {
      name: "张三",
      email: "zhangsan@example.com",
      phone: "13800138000",
      address: "北京市朝阳区某某街道123号"
    },
    date: "2023年10月15日",
    status: "已完成",
    paymentMethod: "支付宝",
    shippingMethod: "标准快递",
    items: [
      { id: 1, name: "产品A", sku: "SKU-001", quantity: 2, price: "¥499.99", total: "¥999.98" },
      { id: 2, name: "产品B", sku: "SKU-002", quantity: 1, price: "¥234.99", total: "¥234.99" },
      { id: 3, name: "产品C", sku: "SKU-003", quantity: 1, price: "¥22.02", total: "¥22.02" }
    ],
    subtotal: "¥1,256.99",
    shipping: "¥0.00",
    tax: "¥0.00",
    total: "¥1,256.99",
    notes: "客户要求为产品A提供礼品包装。"
  };

  const enOrder = {
    id: orderId,
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, CA 94321"
    },
    date: "October 15, 2023",
    status: "Completed",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    shippingMethod: "Standard Shipping",
    items: [
      { id: 1, name: "Product A", sku: "SKU-001", quantity: 2, price: "$73.53", total: "$147.06" },
      { id: 2, name: "Product B", sku: "SKU-002", quantity: 1, price: "$34.56", total: "$34.56" },
      { id: 3, name: "Product C", sku: "SKU-003", quantity: 1, price: "$3.24", total: "$3.24" }
    ],
    subtotal: "$184.86",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$184.86",
    notes: "Customer requested gift wrapping for Product A."
  };

  const order = language === 'zh' ? zhOrder : enOrder;

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
        <div className="mb-8">
          <Link href="/orders" className="text-blue-600 hover:underline flex items-center gap-1">
            ← {t('back.to.orders')}
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {t('order')} {order.id}
          </h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('print')}
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
              {t('update.status')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('customer.info')}</h2>
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{order.customer.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{order.customer.phone}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('shipping.address')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{order.customer.address}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('order.summary')}</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">{t('date')}:</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">{t('status')}:</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">{t('payment.method')}:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('shipping.method')}:</span>
              <span>{order.shippingMethod}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">{t('order.items')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('product')}
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('quantity')}
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('price')}
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider text-right">
                    {t('total')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4 text-right">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span>{t('subtotal')}:</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t('shipping')}:</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t('tax')}:</span>
                  <span>{order.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>{t('total')}:</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('notes')}</h2>
            <p>{order.notes}</p>
          </div>
        )}
      </main>
    </div>
  );
} 