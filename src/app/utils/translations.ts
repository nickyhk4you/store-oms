// 导入翻译数据
const translations = {
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
    'order': '订单',
    'back.to.orders': '返回订单列表',
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
    
    // 搜索和筛选
    'search': '搜索',
    'reset': '重置',
    'search.orders': '搜索订单',
    'advanced.search': '高级搜索',
    'order.number': '订单号',
    'customer.name': '客户名称',
    'start.date': '开始日期',
    'end.date': '结束日期',
    'all.statuses': '所有状态',
    'no.results': '没有找到匹配的订单',
    'items.per.page': '每页显示',
    
    // 仪表盘
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
    
    // 产品和客户
    'products': '产品管理',
    'customers': '客户管理',
    'coming.soon': '即将推出',
    'products.coming.soon': '产品管理功能即将推出',
    'customers.coming.soon': '客户管理功能即将推出',
    'products.page.description': '产品管理功能正在开发中，敬请期待。您将能够添加、编辑和管理所有产品信息。',
    'customers.page.description': '客户管理功能正在开发中，敬请期待。您将能够查看客户信息、订单历史和管理客户关系。',
    
    // 渠道
    'channel': '渠道',
    'channel.all': '所有渠道',
    'channel.xiaohongshu': '小红书',
    'channel.jd': '京东',
    'channel.taobao': '淘宝',
    'channel.douyin': '抖音',
    'channel.wechat': '微信小程序',
    'channel.offline': '线下门店',
    'channel.other': '其他渠道',
    'filter.by.channel': '按渠道筛选',
    'channel.analysis': '渠道分析',
    'top.channels': '热门渠道',
  },
  en: {
    // 通用
    'language': 'Language',
    'chinese': 'Chinese',
    'english': 'English',
    
    // 首页
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
    
    // 订单列表页
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
    
    // 订单状态
    'status.completed': 'Completed',
    'status.processing': 'Processing',
    'status.pending': 'Pending',
    'status.shipped': 'Shipped',
    
    // 订单详情页
    'order': 'Order',
    'back.to.orders': 'Back to Orders',
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
    
    // 搜索和筛选
    'search': 'Search',
    'reset': 'Reset',
    'search.orders': 'Search Orders',
    'advanced.search': 'Advanced Search',
    'order.number': 'Order Number',
    'customer.name': 'Customer Name',
    'start.date': 'Start Date',
    'end.date': 'End Date',
    'all.statuses': 'All Statuses',
    'no.results': 'No matching orders found',
    'items.per.page': 'Items per page',
    
    // 仪表盘
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
    
    // 产品和客户
    'products': 'Products',
    'customers': 'Customers',
    'coming.soon': 'Coming Soon',
    'products.coming.soon': 'Product management features coming soon',
    'customers.coming.soon': 'Customer management features coming soon',
    'products.page.description': 'Product management features are under development. You will be able to add, edit, and manage all product information.',
    'customers.page.description': 'Customer management features are under development. You will be able to view customer information, order history, and manage customer relationships.',
    
    // 渠道
    'channel': 'Channel',
    'channel.all': 'All Channels',
    'channel.xiaohongshu': 'Xiaohongshu',
    'channel.jd': 'JD.com',
    'channel.taobao': 'Taobao',
    'channel.douyin': 'Douyin',
    'channel.wechat': 'WeChat Mini Program',
    'channel.offline': 'Offline Store',
    'channel.other': 'Other Channels',
    'filter.by.channel': 'Filter by Channel',
    'channel.analysis': 'Channel Analysis',
    'top.channels': 'Top Channels',
  }
};

// 获取翻译的函数
export function getTranslations(language: string, key: string): string {
  // 确保语言是有效的
  const lang = language === 'zh' || language === 'en' ? language : 'zh';
  
  // 返回翻译，如果没有找到则返回键名
  return translations[lang as 'zh' | 'en'][key] || key;
}

// 获取当前语言的函数 (可以从 cookie 或其他服务器端存储中获取)
export function getCurrentLanguage(): string {
  // 这里可以添加从 cookie 或其他服务器端存储中获取语言的逻辑
  // 现在简单返回默认语言
  return 'zh';
} 