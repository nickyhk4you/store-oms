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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const itemsPerPage = 10;
  
  // 模拟 Coach 产品数据
  const products: Product[] = [
    {
      id: "COACH-001",
      name: "Tabby 26 手提包",
      category: "手提包",
      price: "¥3,950.00",
      stock: 45,
      status: "在售",
      sku: "C5508-B4/BK",
      image: "/images/coach-tabby-26.jpg",
      description: "Tabby 26 手提包采用精致皮革制成，配有可拆卸肩带，既可手提也可斜挎。"
    },
    {
      id: "COACH-002",
      name: "Willow 托特包",
      category: "托特包",
      price: "¥4,250.00",
      stock: 32,
      status: "在售",
      sku: "C2779-B4/BK",
      image: "/images/coach-willow-tote.jpg",
      description: "Willow 托特包采用柔软皮革制成，宽敞的内部空间可容纳日常必需品。"
    },
    {
      id: "COACH-003",
      name: "Pillow Tabby 18 单肩包",
      category: "单肩包",
      price: "¥3,650.00",
      stock: 28,
      status: "在售",
      sku: "C5846-B4/MC",
      image: "/images/coach-pillow-tabby.jpg",
      description: "Pillow Tabby 18 单肩包采用超软皮革制成，手感如枕头般柔软。"
    },
    {
      id: "COACH-004",
      name: "Kacey 高跟鞋",
      category: "鞋履",
      price: "¥2,450.00",
      stock: 53,
      status: "在售",
      sku: "G4737-BLK",
      image: "/images/coach-kacey-heels.jpg",
      description: "Kacey 高跟鞋采用优质皮革制成，鞋跟高度适中，舒适又时尚。"
    },
    {
      id: "COACH-005",
      name: "Citysole 运动鞋",
      category: "鞋履",
      price: "¥2,150.00",
      stock: 27,
      status: "在售",
      sku: "G5038-WHT",
      image: "/images/coach-citysole.jpg",
      description: "Citysole 运动鞋采用轻量化设计，提供全天舒适的穿着体验。"
    },
    {
      id: "COACH-006",
      name: "Swinger 20 斜挎包",
      category: "斜挎包",
      price: "¥2,950.00",
      stock: 64,
      status: "在售",
      sku: "C0657-B4/BK",
      image: "/images/coach-swinger.jpg",
      description: "Swinger 20 斜挎包是经典款式的现代演绎，紧凑而实用。"
    },
    {
      id: "COACH-007",
      name: "Soft Tabby 手提包",
      category: "手提包",
      price: "¥4,450.00",
      stock: 41,
      status: "在售",
      sku: "C6129-B4/BK",
      image: "/images/coach-soft-tabby.jpg",
      description: "Soft Tabby 手提包采用超软皮革制成，展现奢华质感。"
    },
    {
      id: "COACH-008",
      name: "Lowline 低帮运动鞋",
      category: "鞋履",
      price: "¥1,950.00",
      stock: 38,
      status: "在售",
      sku: "G5285-WHT",
      image: "/images/coach-lowline.jpg",
      description: "Lowline 低帮运动鞋设计简约，百搭实用，适合日常穿着。"
    },
    {
      id: "COACH-009",
      name: "Willis Top Handle 18",
      category: "手提包",
      price: "¥3,750.00",
      stock: 0,
      status: "缺货",
      sku: "C3607-B4/BK",
      image: "/images/coach-willis.jpg",
      description: "Willis Top Handle 18 是对经典款式的重新诠释，复古而时尚。"
    },
    {
      id: "COACH-010",
      name: "Cassie 19 斜挎包",
      category: "斜挎包",
      price: "¥3,250.00",
      stock: 47,
      status: "在售",
      sku: "C0765-B4/BK",
      image: "/images/coach-cassie.jpg",
      description: "Cassie 19 斜挎包设计简约，内部分隔合理，方便收纳。"
    },
    {
      id: "COACH-011",
      name: "Shearling 毛绒拖鞋",
      category: "鞋履",
      price: "¥1,450.00",
      stock: 0,
      status: "缺货",
      sku: "G5472-CHE",
      image: "/images/coach-shearling.jpg",
      description: "Shearling 毛绒拖鞋内衬柔软羊毛，提供极致舒适感。"
    },
    {
      id: "COACH-012",
      name: "Rowan 手提包",
      category: "手提包",
      price: "¥2,950.00",
      stock: 23,
      status: "在售",
      sku: "C3998-B4/BK",
      image: "/images/coach-rowan.jpg",
      description: "Rowan 手提包采用耐用帆布和皮革制成，实用又时尚。"
    },
    {
      id: "COACH-013",
      name: "Georgie 肩背包",
      category: "肩背包",
      price: "¥4,150.00",
      stock: 19,
      status: "在售",
      sku: "C9058-B4/BK",
      image: "/images/coach-georgie.jpg",
      description: "Georgie 肩背包设计优雅，容量适中，适合各种场合。"
    },
    {
      id: "COACH-014",
      name: "Hitch 双肩背包",
      category: "双肩包",
      price: "¥3,850.00",
      stock: 34,
      status: "在售",
      sku: "C2286-B4/BK",
      image: "/images/coach-hitch.jpg",
      description: "Hitch 双肩背包功能性强，适合通勤和短途旅行使用。"
    },
    {
      id: "COACH-015",
      name: "Lana 高跟靴",
      category: "鞋履",
      price: "¥3,250.00",
      stock: 15,
      status: "在售",
      sku: "G5629-BLK",
      image: "/images/coach-lana.jpg",
      description: "Lana 高跟靴采用优质皮革制成，设计简约而不失时尚感。"
    }
  ];

  useEffect(() => {
    // 初始加载时显示所有产品
    setFilteredProducts(products);
  }, []);

  const handleSearch = (searchFilters: ProductFilters) => {
    let results = [...products];
    
    if (searchFilters.productId) {
      results = results.filter(product => 
        product.id.toLowerCase().includes(searchFilters.productId.toLowerCase())
      );
    }
    
    if (searchFilters.productName) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchFilters.productName.toLowerCase())
      );
    }
    
    if (searchFilters.category) {
      results = results.filter(product => 
        product.category === searchFilters.category
      );
    }
    
    if (searchFilters.minPrice) {
      const minPrice = parseFloat(searchFilters.minPrice);
      results = results.filter(product => {
        const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
        return productPrice >= minPrice;
      });
    }
    
    if (searchFilters.maxPrice) {
      const maxPrice = parseFloat(searchFilters.maxPrice);
      results = results.filter(product => {
        const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
        return productPrice <= maxPrice;
      });
    }
    
    if (searchFilters.status) {
      results = results.filter(product => 
        product.status === searchFilters.status
      );
    }
    
    setFilteredProducts(results);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 计算当前页面显示的产品
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const totalItems = filteredProducts.length;

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('products')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('product.management')}</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t('add.product')}
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {t('import.products')}
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t('export.products')}
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              {t('bulk.actions')}
            </button>
          </div>
        </div>
        
        <ProductSearch 
          onSearch={handleSearch} 
          initialFilters={filters}
          totalResults={filteredProducts.length}
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {filteredProducts.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('product.details')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('category')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('price')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('stock')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('status')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 dark:bg-gray-600 rounded-md overflow-hidden">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center">
                                  <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {product.id} | {product.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.status === '在售' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : product.status === '缺货' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                              : product.status === '预售'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3">
                            {t('edit.product')}
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                            {t('delete.product')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {t('no.products.found')}
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {t('low.stock.alert')}
            </h2>
            <div className="space-y-3">
              {products.filter(p => p.stock > 0 && p.stock <= 20).slice(0, 5).map(product => (
                <div key={product.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{product.id}</div>
                    </div>
                  </div>
                  <div className="text-red-600 dark:text-red-400 font-medium">
                    {product.stock} {t('left')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('out.of.stock')}
            </h2>
            <div className="space-y-3">
              {products.filter(p => p.stock === 0).map(product => (
                <div key={product.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{product.id}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md">
                    {t('restock')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 