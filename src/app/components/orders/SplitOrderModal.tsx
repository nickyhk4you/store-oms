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
  warehouse?: string;
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
  items: OrderItem[];
  total: string;
}

interface SplitOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
  onSplitOrder: (originalOrderId: string, newOrders: any[]) => void;
}

export default function SplitOrderModal({ isOpen, onClose, order, onSplitOrder }: SplitOrderModalProps) {
  const { t } = useLanguage();
  const [splitMethod, setSplitMethod] = useState<'manual' | 'warehouse' | 'shipping'>('manual');
  const [newOrders, setNewOrders] = useState<any[]>([
    { id: 'new-1', items: [], name: t('new.order') + ' 1' }
  ]);
  const [unassignedItems, setUnassignedItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState('');

  // 初始化未分配商品列表
  useEffect(() => {
    if (isOpen && order) {
      setUnassignedItems([...order.items]);
      setNewOrders([{ id: 'new-1', items: [], name: t('new.order') + ' 1' }]);
    }
  }, [isOpen, order, t]);

  // 按仓库自动拆分
  const splitByWarehouse = () => {
    if (!order) return;
    
    // 按仓库分组商品
    const warehouseGroups: Record<string, OrderItem[]> = {};
    
    order.items.forEach(item => {
      const warehouse = item.warehouse || t('unknown.warehouse');
      if (!warehouseGroups[warehouse]) {
        warehouseGroups[warehouse] = [];
      }
      warehouseGroups[warehouse].push(item);
    });
    
    // 创建新订单
    const newOrdersList = Object.entries(warehouseGroups).map(([warehouse, items], index) => ({
      id: `new-${index + 1}`,
      name: `${t('warehouse')}: ${warehouse}`,
      items: items
    }));
    
    setNewOrders(newOrdersList);
    setUnassignedItems([]);
  };

  // 添加新订单
  const addNewOrder = () => {
    setNewOrders([
      ...newOrders,
      { id: `new-${newOrders.length + 1}`, items: [], name: t('new.order') + ' ' + (newOrders.length + 1) }
    ]);
  };

  // 移动商品到指定订单
  const moveItemToOrder = (item: OrderItem, targetOrderId: string) => {
    // 从未分配列表中移除
    setUnassignedItems(unassignedItems.filter(i => i.id !== item.id));
    
    // 添加到目标订单
    setNewOrders(newOrders.map(order => {
      if (order.id === targetOrderId) {
        return {
          ...order,
          items: [...order.items, item]
        };
      }
      return order;
    }));
  };

  // 从订单中移除商品，放回未分配列表
  const removeItemFromOrder = (itemId: string, orderId: string) => {
    // 找到要移除的商品
    const orderToUpdate = newOrders.find(o => o.id === orderId);
    if (!orderToUpdate) return;
    
    const itemToRemove = orderToUpdate.items.find((i: OrderItem) => i.id === itemId);
    if (!itemToRemove) return;
    
    // 从订单中移除
    setNewOrders(newOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.filter((i: OrderItem) => i.id !== itemId)
        };
      }
      return order;
    }));
    
    // 添加到未分配列表
    setUnassignedItems([...unassignedItems, itemToRemove]);
  };

  // 删除订单
  const deleteOrder = (orderId: string) => {
    // 找到要删除的订单
    const orderToDelete = newOrders.find(o => o.id === orderId);
    if (!orderToDelete) return;
    
    // 将该订单的商品移回未分配列表
    setUnassignedItems([...unassignedItems, ...orderToDelete.items]);
    
    // 删除订单
    setNewOrders(newOrders.filter(o => o.id !== orderId));
  };

  // 提交拆分
  const handleSubmit = () => {
    // 检查是否所有商品都已分配
    if (unassignedItems.length > 0) {
      setError(t('all.items.must.be.assigned'));
      return;
    }
    
    // 检查是否每个新订单都有商品
    const emptyOrders = newOrders.filter(o => o.items.length === 0);
    if (emptyOrders.length > 0) {
      setError(t('empty.orders.not.allowed'));
      return;
    }
    
    // 提交拆分
    onSplitOrder(order.id, newOrders);
    onClose();
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('split.order')}: {order.orderNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{t('split.method')}</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setSplitMethod('manual');
                  setUnassignedItems([...order.items]);
                  setNewOrders([{ id: 'new-1', items: [], name: t('new.order') + ' 1' }]);
                }}
                className={`px-4 py-2 rounded-md ${
                  splitMethod === 'manual' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t('manual.split')}
              </button>
              <button
                onClick={() => {
                  setSplitMethod('warehouse');
                  splitByWarehouse();
                }}
                className={`px-4 py-2 rounded-md ${
                  splitMethod === 'warehouse' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t('split.by.warehouse')}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 未分配商品列表 */}
            <div>
              <h3 className="text-lg font-medium mb-2">{t('unassigned.items')}</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                {unassignedItems.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    {t('all.items.assigned')}
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {unassignedItems.map(item => (
                      <li key={item.id} className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.productName} 
                                className="w-12 h-12 object-cover rounded-md mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t('sku')}: {item.sku} | {t('quantity')}: {item.quantity}
                              </p>
                              {item.warehouse && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {t('warehouse')}: {item.warehouse}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <select
                              onChange={(e) => moveItemToOrder(item, e.target.value)}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700"
                            >
                              <option value="">{t('select.order')}</option>
                              {newOrders.map(order => (
                                <option key={order.id} value={order.id}>
                                  {order.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* 新订单列表 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{t('new.orders')}</h3>
                <button
                  onClick={addNewOrder}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  + {t('add.order')}
                </button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {newOrders.map(order => (
                  <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{order.name}</h4>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                        disabled={newOrders.length <= 1}
                      >
                        {t('delete')}
                      </button>
                    </div>
                    
                    {order.items.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        {t('no.items.in.order')}
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {order.items.map((item: OrderItem) => (
                          <li key={item.id} className="py-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.productName} 
                                    className="w-10 h-10 object-cover rounded-md mr-3"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{item.productName}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('quantity')}: {item.quantity} | {item.price}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeItemFromOrder(item.id, order.id)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
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
            disabled={unassignedItems.length > 0}
          >
            {t('confirm.split')}
          </button>
        </div>
      </div>
    </div>
  );
} 