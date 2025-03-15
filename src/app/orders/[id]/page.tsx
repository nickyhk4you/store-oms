'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderDetails from "./OrderDetails";

// This is a client component that handles its own routing
export default function OrderPage() {
  const params = useParams();
  const [orderData, setOrderData] = useState(null);
  
  useEffect(() => {
    // Get the ID from the URL
    const id = params?.id as string;
    if (id) {
      // In a real app, you would fetch data here
      // For now, we'll just use mock data
      setOrderData({
        id: id,
        orderNumber: `ORD-2023-${id}`,
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
      });
    }
  }, [params]);
  
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return <OrderDetails orderData={orderData} />;
} 