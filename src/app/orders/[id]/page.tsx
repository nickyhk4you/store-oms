import Link from "next/link";
import { getTranslations } from "../../utils/translations"; // 创建一个服务器端翻译函数

// 使用服务器组件参数
export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // 在服务器端获取语言和翻译
  const language = 'zh'; // 从 cookie 或其他服务器端方法获取
  const t = (key: string) => getTranslations(language, key);
  
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
    date: "2023-05-15",
    status: "已完成",
    channel: "小红书",
    paymentMethod: "支付宝",
    shippingMethod: "顺丰速运",
    items: [
      {
        id: "PROD-001",
        name: "高级保湿面霜",
        price: "¥299.00",
        quantity: 1,
        total: "¥299.00"
      },
      {
        id: "PROD-002",
        name: "精华液",
        price: "¥459.00",
        quantity: 2,
        total: "¥918.00"
      }
    ],
    subtotal: "¥1,217.00",
    shipping: "¥20.00",
    tax: "¥73.02",
    total: "¥1,310.02",
    notes: "请在工作日送货，周末不在家。"
  };
  
  const enOrder = {
    id: orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, CA 12345, USA"
    },
    date: "2023-05-15",
    status: "Completed",
    channel: "Xiaohongshu",
    paymentMethod: "PayPal",
    shippingMethod: "Express Delivery",
    items: [
      {
        id: "PROD-001",
        name: "Premium Moisturizing Cream",
        price: "$45.99",
        quantity: 1,
        total: "$45.99"
      },
      {
        id: "PROD-002",
        name: "Essence Serum",
        price: "$69.99",
        quantity: 2,
        total: "$139.98"
      }
    ],
    subtotal: "$185.97",
    shipping: "$5.99",
    tax: "$11.16",
    total: "$203.12",
    notes: "Please deliver on weekdays, not available on weekends."
  };
  
  // 根据当前语言选择订单数据
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
  
  // 获取渠道图标的辅助函数
  function getChannelIcon(channel: string) {
    switch (channel) {
      case '小红书':
      case 'Xiaohongshu':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case '京东':
      case 'JD.com':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case '淘宝':
      case 'Taobao':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case '抖音':
      case 'Douyin':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-black text-white">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case '微信小程序':
      case 'WeChat Mini Program':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
            </svg>
            {channel}
          </span>
        );
      case '线下门店':
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
        <div className="mb-6">
          <Link href="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 mb-6">
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('back.to.orders')}
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('order')} {order.id}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-600 dark:text-gray-400">{order.date}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {getChannelIcon(order.channel)}
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
                {t('print')}
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                {t('update.status')}
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">{t('customer.info')}</h2>
              <div className="space-y-2">
                <p className="font-medium">{order.customer.name}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
              
              <h2 className="text-lg font-semibold mt-6 mb-4">{t('shipping.address')}</h2>
              <p className="whitespace-pre-line">{order.customer.address}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">{t('order.summary')}</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('payment.method')}:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('shipping.method')}:</span>
                  <span>{order.shippingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('channel')}:</span>
                  <span>{order.channel}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">{t('order.items')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('product')}</th>
                    <th className="px-4 py-3 text-center">{t('quantity')}</th>
                    <th className="px-4 py-3 text-right">{t('price')}</th>
                    <th className="px-4 py-3 text-right">{t('total')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.id}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">{item.quantity}</td>
                      <td className="px-4 py-4 text-right">{item.price}</td>
                      <td className="px-4 py-4 text-right">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-200 dark:border-gray-700">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium">{t('subtotal')}:</td>
                    <td className="px-4 py-3 text-right">{order.subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium">{t('shipping')}:</td>
                    <td className="px-4 py-3 text-right">{order.shipping}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium">{t('tax')}:</td>
                    <td className="px-4 py-3 text-right">{order.tax}</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td colSpan={3} className="px-4 py-3 text-right font-bold">{t('total')}:</td>
                    <td className="px-4 py-3 text-right font-bold">{order.total}</td>
                  </tr>
                </tfoot>
              </table>
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