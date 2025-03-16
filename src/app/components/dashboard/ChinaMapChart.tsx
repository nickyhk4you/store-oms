'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import * as echarts from 'echarts';
import { registerMap } from 'echarts/core';

// 中国地图数据
// 注意：实际应用中，您应该从公共API或本地JSON文件导入完整的地图数据
// 这里为了简化，我们将使用ECharts提供的中国地图数据

interface ProvinceData {
  name: string;
  value: number;
}

interface ChinaMapChartProps {
  data: ProvinceData[];
}

// 定义符合 ECharts 要求的 GeoJSON 类型
interface GeoJSONFeature {
  type: "Feature";
  id: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GeoJSON {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export default function ChinaMapChart({ data }: ChinaMapChartProps) {
  const { t } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // 确保组件只在客户端渲染
  useEffect(() => {
    setIsClient(true);
    
    // 从CDN加载更精确的中国地图数据
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(response => response.json())
      .then(chinaMap => {
        // 注册地图数据
        registerMap('china', chinaMap as any);
        
        // 初始化图表（在地图数据加载后）
        if (chartRef.current) {
          initChart();
        }
      })
      .catch(error => {
        console.error("Failed to load China map data:", error);
        // 如果从CDN加载失败，尝试使用本地数据
        import('../../data/china.json').then(module => {
          // 使用 any 类型绕过类型检查
          registerMap('china', module.default as any);
          if (chartRef.current) {
            initChart();
          }
        });
      });
  }, []);
  
  // 初始化图表的函数
  const initChart = () => {
    if (!chartRef.current) return;
    
    try {
      // 初始化图表
      const chartInstance = echarts.init(chartRef.current);
      setChart(chartInstance);
      
      // 配置图表选项
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
            // 调整地图初始大小
            zoom: 1.2, // 增加初始缩放级别
            // 调整地图中心点，使其居中显示
            center: [104, 36],
            aspectScale: 0.85, // 调整地图长宽比
            layoutCenter: ['50%', '50%'], // 地图位于容器中心
            layoutSize: '100%', // 地图占据容器的100%
            emphasis: {
              label: {
                show: true,
                fontSize: 12
              },
              itemStyle: {
                areaColor: '#ffd666',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
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
            // 确保省份名称正确匹配
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
      
      // 设置图表选项
      chartInstance.setOption(option);
      
      // 处理窗口大小变化
      const handleResize = () => {
        chartInstance.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    } catch (error) {
      console.error("Failed to initialize chart:", error);
    }
  };
  
  // 当数据或语言变化时更新图表
  useEffect(() => {
    if (chart) {
      try {
        const option = {
          title: {
            text: t('order.distribution.by.province') || '各省份订单分布'
          },
          tooltip: {
            formatter: '{b}: {c} ' + (t('orders') || '订单')
          },
          visualMap: {
            max: Math.max(...data.map(item => item.value), 100),
            text: [t('high') || '高', t('low') || '低']
          },
          series: [
            {
              name: t('orders') || '订单',
              data: data
            }
          ]
        };
        
        chart.setOption(option);
      } catch (error) {
        console.error("Failed to update chart:", error);
      }
    }
  }, [data, t, chart]);
  
  if (!isClient) {
    return <div className="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div 
        ref={chartRef} 
        className="h-[500px] w-full" // 增加地图容器高度
      ></div>
    </div>
  );
} 