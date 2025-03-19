"use client"

import React from 'react';

interface IncentiveChartProps {
  timeRange: 'week' | 'month' | 'quarter';
  language: string;
}

export default function IncentiveChart({ timeRange, language }: IncentiveChartProps) {
  // 在实际应用中，这里会根据timeRange加载不同的数据
  // 这里只是一个简单的图表占位符
  
  // 模拟数据
  const generateData = () => {
    const data = [];
    const periods = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    
    for (let i = 0; i < periods; i++) {
      data.push({
        date: i,
        orders: Math.floor(Math.random() * 20) + 10,
        incentives: Math.floor(Math.random() * 1000) + 500
      });
    }
    
    return data;
  };
  
  const data = generateData();
  const maxOrders = Math.max(...data.map(d => d.orders));
  const maxIncentives = Math.max(...data.map(d => d.incentives));
  
  return (
    <div className="w-full h-full">
      <div className="flex h-full flex-col">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#6B4423] rounded-full mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {language === 'zh' ? '配送订单数' : 'Orders Fulfilled'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full mr-2"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {language === 'zh' ? '激励金额' : 'Incentive Amount'}
            </span>
          </div>
        </div>
        
        <div className="flex-1 relative">
          {/* 图表Y轴 */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* 图表内容 */}
          <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div 
                  className="w-1 bg-[#D4AF37] rounded-t"
                  style={{ height: `${(item.incentives / maxIncentives) * 100}%` }}
                ></div>
                <div 
                  className="w-3 bg-[#6B4423] rounded-t mt-1"
                  style={{ height: `${(item.orders / maxOrders) * 100}%` }}
                ></div>
                {index % 5 === 0 && (
                  <span className="text-xs text-gray-500 mt-1">
                    {timeRange === 'week' 
                      ? ['日', '一', '二', '三', '四', '五', '六'][index % 7]
                      : index + 1
                    }
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {language === 'zh' 
            ? (timeRange === 'week' ? '本周' : timeRange === 'month' ? '本月' : '本季度') + '激励效果趋势'
            : (timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Quarterly') + ' Incentive Performance Trend'
          }
        </div>
      </div>
    </div>
  );
} 