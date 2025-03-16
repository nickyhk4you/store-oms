'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  image?: string;
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
  paymentMethod: string;
  shippingMethod: string;
  items: OrderItem[];
  total: string;
}

interface MergeOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderData[];
  onMergeOrders: (orderIds: string[], mergedOrder: any) => void;
}

export default function MergeOrdersModal({ isOpen, onClose, orders, onMergeOrders }: MergeOrdersModalProps) {
  const { t } = useLanguage();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const [mergedItems, setMergedItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [error, setError] = useState('');

  // 初始化
  useEffect(() => {
    if (isOpen && orders.length > 0) {
      setSelectedOrders([]);
      setShippingAddress('');
      setPaymentMethod('');
      setShippingMethod('');
      setCompatibilityIssues([]);
      setMergedItems([]);
      setTotalAmount('');
      setError('');
    }
  }, [isOpen, orders]);

  // 处理订单选择
  const handleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // 检查订单兼容性并合并商品
  useEffect(() => {
    if (selectedOrders.length < 2) {
      setCompatibilityIssues([]);
      setMergedItems([]);
      setTotalAmount('');
      return;
    }

    const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));
    const issues: string[] = [];

    // 检查客户是否相同
    const customers = new Set(selectedOrdersData.map(order => order.customer.name));
    if (customers.size > 1) {
      issues.push(t('different.customers.warning'));
    }

    // 检查支付方式是否兼容
    const paymentMethods = new Set(selectedOrdersData.map(order => order.paymentMethod));
    if (paymentMethods.size > 1) {
      issues.push(t('different.payment.methods.warning'));
    }

    // 检查配送方式是否兼容
    const shippingMethods = new Set(selectedOrdersData.map(order => order.shippingMethod));
    if (shippingMethods.size > 1) {
      issues.push(t('different.shipping.methods.warning'));
    }

    // 合并商品
    const allItems: OrderItem[] = [];
    const itemMap = new Map<string, OrderItem>();

    selectedOrdersData.forEach(order => {
      order.items.forEach(item => {
        const key = `${item.productId}-${item.sku}`;
        if (itemMap.has(key)) {
          const existingItem = itemMap.get(key)!;
          existingItem.quantity += item.quantity;
          // 更新总价，这里简化处理，实际应用中可能需要更复杂的计算
          const existingTotal = parseFloat(existingItem.total.replace(/[^0-9.-]+/g, ''));
          const itemTotal = parseFloat(item.total.replace(/[^0-9.-]+/g, ''));
          existingItem.total = `¥${(existingTotal + itemTotal).toFixed(2)}`;
        } else {
          itemMap.set(key, { ...item });
          allItems.push(itemMap.get(key)!);
        }
      });
    });

    // 计算总金额
    const total = allItems.reduce((sum, item) => {
      const itemTotal = parseFloat(item.total.replace(/[^0-9.-]+/g, ''));
      return sum + itemTotal;
    }, 0);

    setMergedItems(allItems);
    setTotalAmount(`¥${total.toFixed(2)}`);
    setCompatibilityIssues(issues);

    // 设置默认值
    if (selectedOrdersData.length > 0 && !shippingAddress) {
      setShippingAddress(selectedOrdersData[0].customer.address);
    }
    
    if (paymentMethods.size === 1 && !paymentMethod) {
      setPaymentMethod(Array.from(paymentMethods)[0]);
    }
    
    if (shippingMethods.size === 1 && !shippingMethod) {
      setShippingMethod(Array.from(shippingMethods)[0]);
    }
  }, [selectedOrders, orders, t, shippingAddress, paymentMethod, shippingMethod]);

  // 提交合并
  const handleSubmit = () => {
    if (selectedOrders.length < 2) {
      setError(t('select.at.least.two.orders'));
      return;
    }

    if (!shippingAddress) {
      setError(t('shipping.address.required'));
      return;
    }

    if (!paymentMethod) {
      setError(t('payment.method.required'));
      return;
    }

    if (!shippingMethod) {
      setError(t('shipping.method.required'));
      return;
    }

    // 创建合并后的订单
    const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));
    const firstOrder = selectedOrdersData[0];
    
    const mergedOrder = {
      orderNumber: `M-${Date.now().toString().slice(-6)}`,
      customer: firstOrder.customer,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      items: mergedItems,
      total: totalAmount,
      originalOrders: selectedOrders,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    onMergeOrders(selectedOrders, mergedOrder);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('merge.orders')}</h2>
        </div>
        
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 订单选择 */}
            <div>
              <h3 className="text-lg font-medium mb-2">{t('select.orders.to.merge')}</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map(order => (
                    <li key={order.id} className="py-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id={`order-${order.id}`}
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleOrderSelection(order.id)}
                          className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`order-${order.id}`} className="ml-3 block">
                          <div className="font-medium">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {t('customer')}: {order.customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {t('date')}: {order.date}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {t('items')}: {order.items.length} | {t('total')}: {order.total}
                          </div>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 合并预览 */}
            <div>
              <h3 className="text-lg font-medium mb-2">{t('merged.order.preview')}</h3>
              
              {selectedOrders.length < 2 ? (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center text-gray-500 dark:text-gray-400">
                  {t('select.orders.to.preview')}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 兼容性警告 */}
                  {compatibilityIssues.length > 0 && (
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
                      <h4 className="font-medium mb-1">{t('compatibility.issues')}</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {compatibilityIssues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* 配送信息 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <h4 className="font-medium mb-2">{t('shipping.information')}</h4>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('shipping.address')}
                      </label>
                      <select
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700"
                      >
                        <option value="">{t('select.address')}</option>
                        {Array.from(new Set(orders.filter(order => selectedOrders.includes(order.id)).map(order => order.customer.address))).map((address, index) => (
                          <option key={index} value={address}>
                            {address}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('payment.method')}
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700"
                      >
                        <option value="">{t('select.payment.method')}</option>
                        {Array.from(new Set(orders.filter(order => selectedOrders.includes(order.id)).map(order => order.paymentMethod))).map((method, index) => (
                          <option key={index} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('shipping.method')}
                      </label>
                      <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700"
                      >
                        <option value="">{t('select.shipping.method')}</option>
                        {Array.from(new Set(orders.filter(order => selectedOrders.includes(order.id)).map(order => order.shippingMethod))).map((method, index) => (
                          <option key={index} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* 合并后的商品列表 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <h4 className="font-medium mb-2">{t('merged.items')}</h4>
                    
                    {mergedItems.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        {t('no.items')}
                      </p>
                    ) : (
                      <div>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[200px] overflow-y-auto">
                          {mergedItems.map(item => (
                            <li key={item.id} className="py-2">
                              <div className="flex items-center">
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.productName} 
                                    className="w-10 h-10 object-cover rounded-md mr-3"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{item.productName}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('quantity')}: {item.quantity} | {item.price}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{item.total}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                          <span className="font-medium">{t('total')}:</span>
                          <span className="font-bold">{totalAmount}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={selectedOrders.length < 2 || !shippingAddress || !paymentMethod || !shippingMethod}
          >
            {t('confirm.merge')}
          </button>
        </div>
      </div>
    </div>
  );
} 