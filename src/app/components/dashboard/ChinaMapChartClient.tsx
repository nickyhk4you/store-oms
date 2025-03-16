'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import * as echarts from 'echarts';
import { registerMap } from 'echarts/core';

interface ProvinceData {
  name: string;
  value: number;
}

interface ChinaMapChartProps {
  data: ProvinceData[];
}

export default function ChinaMapChartClient({ data }: ChinaMapChartProps) {
  const { t } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  
  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;
    
    // 从本地加载中国地图数据
    const loadMap = async () => {
      try {
        const chinaMapModule = await import('../../data/china.json');
        registerMap('china', chinaMapModule.default as any);
        initChart();
      } catch (error) {
        console.error("Failed to load map data:", error);
      }
    };
    
    loadMap();
    
    // 清理函数
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);
  
  // 初始化图表函数
  const initChart = () => {
    if (!chartRef.current) return;
    
    try {
      const chartInstance = echarts.init(chartRef.current);
      setChart(chartInstance);
      
      const option = {
        title: {
          text: t('order.distribution.by.province') || '各省份订单分布',
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ' + (t('orders') || '订单')
        },
        visualMap: {
          min: 0,
          max: Math.max(...data.map(item => item.value), 100),
          left: 'left',
          top: 'bottom',
          text: [t('high') || '高', t('low') || '低'],
          calculable: true,
          inRange: {
            color: ['#e0f2fe', '#3b82f6', '#1e40af']
          }
        },
        series: [
          {
            name: t('orders') || '订单',
            type: 'map',
            map: 'china',
            roam: true,
            zoom: 1.2,
            center: [104, 36],
            aspectScale: 0.85,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            emphasis: {
              label: {
                show: true,
                fontSize: 12
              },
              itemStyle: {
                areaColor: '#ffd666',
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 1
            },
            label: {
              show: true,
              fontSize: 10
            },
            data: data,
            nameMap: {
              '北京市': '北京',
              '天津市': '天津',
              '河北省': '河北',
              '山西省': '山西',
              '内蒙古自治区': '内蒙古',
              '辽宁省': '辽宁',
              '吉林省': '吉林',
              '黑龙江省': '黑龙江',
              '上海市': '上海',
              '江苏省': '江苏',
              '浙江省': '浙江',
              '安徽省': '安徽',
              '福建省': '福建',
              '江西省': '江西',
              '山东省': '山东',
              '河南省': '河南',
              '湖北省': '湖北',
              '湖南省': '湖南',
              '广东省': '广东',
              '广西壮族自治区': '广西',
              '海南省': '海南',
              '重庆市': '重庆',
              '四川省': '四川',
              '贵州省': '贵州',
              '云南省': '云南',
              '西藏自治区': '西藏',
              '陕西省': '陕西',
              '甘肃省': '甘肃',
              '青海省': '青海',
              '宁夏回族自治区': '宁夏',
              '新疆维吾尔自治区': '新疆',
              '台湾省': '台湾',
              '香港特别行政区': '香港',
              '澳门特别行政区': '澳门'
            }
          }
        ]
      };
      
      chartInstance.setOption(option);
      
      const handleResize = () => {
        chartInstance.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error("Failed to initialize chart:", error);
    }
  };
  
  // 更新图表数据
  useEffect(() => {
    if (chart) {
      try {
        chart.setOption({
          series: [{ data: data }]
        });
      } catch (error) {
        console.error("Failed to update chart:", error);
      }
    }
  }, [data, chart]);
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div 
        ref={chartRef} 
        className="h-[500px] w-full"
      ></div>
    </div>
  );
} 