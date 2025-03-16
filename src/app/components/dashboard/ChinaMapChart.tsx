'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import * as echarts from 'echarts';
import { registerMap } from 'echarts/core';
import dynamic from 'next/dynamic';

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

// 使用 dynamic 导入确保组件只在客户端渲染
const ChinaMapChart = dynamic(() => 
  import('./ChinaMapChartClient').then((mod) => mod.default), 
  { ssr: false }
);

export default ChinaMapChart; 