import Link from "next/link";

// 模拟订单数据
const orders = [
  { id: "ORD-001", customer: "张三", date: "2023-10-15", status: "已完成", total: "¥1,256.99" },
  { id: "ORD-002", customer: "李四", date: "2023-10-16", status: "处理中", total: "¥889.50" },
  { id: "ORD-003", customer: "王五", date: "2023-10-16", status: "待处理", total: "¥2,110.75" },
  { id: "ORD-004", customer: "赵六", date: "2023-10-17", status: "已发货", total: "¥3,445.20" },
  { id: "ORD-005", customer: "钱七", date: "2023-10-17", status: "待处理", total: "¥784.45" },
  { id: "ORD-006", customer: "孙八", date: "2023-10-18", status: "处理中", total: "¥1,224.99" },
  { id: "ORD-007", customer: "周九", date: "2023-10-18", status: "已完成", total: "¥4,332.10" },
  { id: "ORD-008", customer: "吴十", date: "2023-10-19", status: "已发货", total: "¥655.75" },
];

// 获取状态颜色的辅助函数
function getStatusColor(status: string) {
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
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">订单管理</h1>
          <div className="flex gap-4">
            <button className="bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
              筛选
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              新建订单
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    订单编号
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    客户
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    总金额
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
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
                          查看
                        </Link>
                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                          编辑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                显示 <span className="font-medium">1</span> 到 <span className="font-medium">8</span> 共 <span className="font-medium">8</span> 条结果
              </div>
              <div className="flex gap-2">
                <button disabled className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500">
                  上一页
                </button>
                <button disabled className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500">
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 