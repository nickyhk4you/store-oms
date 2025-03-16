'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import ProductSearch from "../components/ProductSearch";
import Pagination from "../components/Pagination";
import Image from "next/image";

// 产品接口定义
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  sku: string;
  image: string;
  description: string;
}

// 产品筛选条件接口
export interface ProductFilters {
  productId: string;
  productName: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({
    productId: '',
    productName: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  });
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  useEffect(() => {
    // 模拟加载产品数据
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Coach Tabby 手提包',
          sku: 'C2273_B4HA',
          category: '手提包',
          price: '¥4,500',
          stock: 15,
          image: 'https://img.coach.com/is/image/Coach/c2273_b4ha_a0?$desktopProduct$',
          status: '有库存',
          description: '奢华Coach手提包，采用标志性图案设计'
        },
        {
          id: '2',
          name: 'Coach Willow 托特包',
          sku: 'C0002-TAN',
          category: '托特包',
          price: '¥3,800',
          stock: 18,
          image: 'https://img.coach.com/is/image/Coach/c4285_b4nq4_a0?$desktopProduct$',
          status: '有库存',
          description: '经典托特包设计，实用美观'
        },
        {
          id: '3',
          name: 'Coach Kleo 单肩包',
          sku: 'C0003-RED',
          category: '单肩包',
          price: '¥3,200',
          stock: 12,
          image: 'https://img.coach.com/is/image/Coach/c3078_b4bwt_a0?$desktopProduct$',
          status: '有库存',
          description: '时尚单肩包，适合日常使用'
        },
        {
          id: '4',
          name: 'Coach Soft 钱包',
          sku: 'C0004-BRN',
          category: '钱包',
          price: '¥1,500',
          stock: 36,
          image: 'https://img.coach.com/is/image/Coach/c8320_imcah_a0?$desktopProduct$',
          status: '有库存',
          description: '精致钱包，多卡位设计'
        },
        {
          id: '5',
          name: 'Coach Swagger 背包',
          sku: 'C0005-NVY',
          category: '背包',
          price: '¥4,200',
          stock: 9,
          image: 'https://img.coach.com/is/image/Coach/c1533_qbmi5_a0?$desktopProduct$',
          status: '库存不足',
          description: '时尚背包，容量大，适合旅行'
        },
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);
  
  // 处理产品选择
  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  // 处理全选
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };
  
  // 过滤和排序产品
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        const priceA = parseFloat(a.price.replace('¥', '').replace(',', ''));
        const priceB = parseFloat(b.price.replace('¥', '').replace(',', ''));
        comparison = priceA - priceB;
      } else if (sortBy === 'stock') {
        comparison = a.stock - b.stock;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  
  // 骨架屏加载状态
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#6B4423] dark:text-[#C3A080]">{t('products')}</h1>
        <Link href="/products/new" className="btn-primary">
          + {t('new.product')}
        </Link>
      </div>
      
      {/* 筛选和搜索 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#6B4423] dark:text-[#C3A080] mb-1">{t('filter.products')}</label>
          <select 
            className="w-full border border-[#C3A080]/30 rounded-md bg-white dark:bg-neutral-800 text-[#6B4423] dark:text-[#C3A080] py-2 px-3"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{t('all.categories')}</option>
            <option value="手提包">手提包</option>
            <option value="托特包">托特包</option>
            <option value="单肩包">单肩包</option>
            <option value="钱包">钱包</option>
            <option value="背包">背包</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#6B4423] dark:text-[#C3A080] mb-1">{t('search.products')}</label>
          <input
            type="text"
            className="w-full border border-[#C3A080]/30 rounded-md bg-white dark:bg-neutral-800 text-[#6B4423] dark:text-[#C3A080] py-2 px-3"
            placeholder={t('search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#6B4423] dark:text-[#C3A080] mb-1">{t('sort.by')}</label>
          <div className="flex">
            <select
              className="flex-grow border border-r-0 border-[#C3A080]/30 rounded-l-md bg-white dark:bg-neutral-800 text-[#6B4423] dark:text-[#C3A080] py-2 px-3"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">{t('name')}</option>
              <option value="price">{t('price')}</option>
              <option value="stock">{t('stock')}</option>
            </select>
            <button
              className="px-3 py-2 border border-l-0 border-[#C3A080]/30 rounded-r-md bg-white dark:bg-neutral-800"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? (
                <svg className="w-5 h-5 text-[#6B4423] dark:text-[#C3A080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#6B4423] dark:text-[#C3A080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* 批量操作 */}
      {selectedProducts.length > 0 && (
        <div className="bg-[#F5EFE0]/50 dark:bg-[#6B4423]/10 border border-[#C3A080]/30 rounded-md p-4 mb-6 flex justify-between items-center">
          <div className="text-[#6B4423] dark:text-[#C3A080]">
            {t('selected')}: <span className="font-medium">{selectedProducts.length}</span> {t('items')}
          </div>
          <div className="flex space-x-2">
            <button className="btn-outline text-sm py-1">
              {t('bulk.actions')}
            </button>
            <button className="btn-secondary text-sm py-1">
              {t('update.stock')}
            </button>
          </div>
        </div>
      )}
      
      {/* 产品列表 */}
      <div className="coach-card p-6 mb-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-[#C3A080]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-4 text-[#6B4423] dark:text-[#C3A080]">{t('no.products.found')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(product => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#6B4423] dark:text-[#C3A080] font-medium mb-1">{product.name}</h3>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">SKU: {product.sku}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6B4423] dark:text-[#C3A080] font-bold">{product.price}</span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('stock')}: {product.stock}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* 分页 */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('showing.products')} <span className="font-medium">{filteredProducts.length}</span> {t('of.products')} <span className="font-medium">{products.length}</span> {t('products.count')}
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-[#C3A080]/30 rounded-md text-[#6B4423] dark:text-[#C3A080] bg-white dark:bg-neutral-800 disabled:opacity-50" disabled>
            {t('previous.products')}
          </button>
          <button className="px-3 py-1 border border-[#C3A080]/30 rounded-md text-[#6B4423] dark:text-[#C3A080] bg-white dark:bg-neutral-800 disabled:opacity-50" disabled>
            {t('next.products')}
          </button>
        </div>
      </div>
    </div>
  );
} 