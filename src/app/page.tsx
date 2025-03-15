import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">订单管理系统</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            高效管理订单处理和库存跟踪
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">订单管理</h2>
            <p className="mb-4">查看、处理和跟踪所有客户订单。</p>
            <Link 
              href="/orders" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              查看订单
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">数据统计</h2>
            <p className="mb-4">通过实时分析获取业务洞察。</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              查看统计
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">快速统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">待处理订单</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">今日完成</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">总收入</p>
              <p className="text-2xl font-bold">¥42,850</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">平均处理时间</p>
              <p className="text-2xl font-bold">1.8 天</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
