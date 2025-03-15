import Link from "next/link";

// 这是一个动态路由，将匹配如 /orders/ORD-001 的路径
export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orderId = params.id;
  
  // 模拟特定订单的数据
  const order = {
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

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/orders" className="text-blue-600 hover:underline flex items-center gap-1">
            ← 返回订单列表
          </Link>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">订单 {orderId}</h1>
            <p className="text-gray-600 dark:text-gray-300">{order.date}</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
              打印
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              更新状态
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">客户信息</h2>
            <p className="font-medium">{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">收货地址</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.address}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">订单摘要</h2>
            <div className="flex justify-between mb-2">
              <span>状态:</span>
              <span className="font-medium">{order.status}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>支付方式:</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>配送方式:</span>
              <span className="font-medium">{order.shippingMethod}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <h2 className="text-lg font-semibold p-6 border-b border-gray-200 dark:border-gray-700">
            订单商品
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    商品
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    数量
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    单价
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    小计
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.sku}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4 font-medium">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span>小计:</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>运费:</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>税费:</span>
                  <span>{order.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>总计:</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">备注</h2>
            <p>{order.notes}</p>
          </div>
        )}
      </main>
    </div>
  );
} 