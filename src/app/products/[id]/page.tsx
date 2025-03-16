'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  status: string;
  description: string;
}

export default function ProductDetail() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // 模拟从API获取产品详情
    setTimeout(() => {
      // 根据ID获取不同的产品
      let mockProduct: Product;
      
      switch(params.id) {
        case '1':
          mockProduct = {
            id: '1',
            name: 'Coach Tabby 手提包',
            sku: 'C2273_B4HA',
            category: '手提包',
            price: '¥4,500',
            stock: 15,
            image: 'https://img.coach.com/is/image/Coach/c2273_b4ha_a0?$desktopProduct$',
            status: '有库存',
            description: '奢华Coach手提包，采用标志性图案设计。采用优质材料和专业工艺制作。适合日常使用或特殊场合。'
          };
          break;
        case '2':
          mockProduct = {
            id: '2',
            name: 'Coach Willow 托特包',
            sku: 'C0002-TAN',
            category: '托特包',
            price: '¥3,800',
            stock: 18,
            image: 'https://img.coach.com/is/image/Coach/c4285_b4nq4_a0?$desktopProduct$',
            status: '有库存',
            description: '经典托特包设计，实用美观。宽敞的内部空间，适合工作和日常使用。'
          };
          break;
        case '3':
          mockProduct = {
            id: '3',
            name: 'Coach Kleo 单肩包',
            sku: 'C0003-RED',
            category: '单肩包',
            price: '¥3,200',
            stock: 12,
            image: 'https://img.coach.com/is/image/Coach/c3078_b4bwt_a0?$desktopProduct$',
            status: '有库存',
            description: '时尚单肩包，适合日常使用。精致的设计和优质的材料，展现品牌特色。'
          };
          break;
        case '4':
          mockProduct = {
            id: '4',
            name: 'Coach Soft 钱包',
            sku: 'C0004-BRN',
            category: '钱包',
            price: '¥1,500',
            stock: 36,
            image: 'https://img.coach.com/is/image/Coach/c8320_imcah_a0?$desktopProduct$',
            status: '有库存',
            description: '精致钱包，多卡位设计。采用优质皮革制作，手感舒适，经久耐用。'
          };
          break;
        case '5':
          mockProduct = {
            id: '5',
            name: 'Coach Swagger 背包',
            sku: 'C0005-NVY',
            category: '背包',
            price: '¥4,200',
            stock: 9,
            image: 'https://img.coach.com/is/image/Coach/c1533_qbmi5_a0?$desktopProduct$',
            status: '库存不足',
            description: '时尚背包，容量大，适合旅行。多个隔层设计，方便整理物品。'
          };
          break;
        default:
          mockProduct = {
            id: '1',
            name: 'Coach Tabby 手提包',
            sku: 'C2273_B4HA',
            category: '手提包',
            price: '¥4,500',
            stock: 15,
            image: 'https://img.coach.com/is/image/Coach/c2273_b4ha_a0?$desktopProduct$',
            status: '有库存',
            description: '奢华Coach手提包，采用标志性图案设计。采用优质材料和专业工艺制作。适合日常使用或特殊场合。'
          };
      }
      
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // 添加到购物车的逻辑
    alert(`Added ${quantity} of ${product?.name} to cart`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('product_not_found')}</h1>
          <button 
            onClick={() => router.push('/products')}
            className="text-[#6B4423] dark:text-[#C3A080] flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('back_to_products')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.push('/products')}
        className="text-[#6B4423] dark:text-[#C3A080] flex items-center mb-6"
      >
        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {t('back_to_products')}
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 产品图片 */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="relative h-96 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        
        {/* 产品信息 */}
        <div>
          <h1 className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mb-2">
            {product.name}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            SKU: {product.sku}
          </p>
          <div className="mb-4">
            <span className="text-xl font-semibold text-[#6B4423] dark:text-[#C3A080]">
              {product.price}
            </span>
          </div>
          
          <div className="mb-4">
            <p className="text-neutral-700 dark:text-neutral-300">
              {product.description}
            </p>
          </div>
          
          <div className="mb-4">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {product.stock > 0 ? t('in_stock') : t('out_of_stock')}
            </span>
            <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">
              {product.stock} {t('items_available')}
            </span>
          </div>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {t('quantity')}
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-[#C3A080] focus:border-[#C3A080] dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center justify-center w-full px-4 py-2 bg-[#6B4423] dark:bg-[#C3A080] text-white rounded-md hover:bg-[#5A381D] dark:hover:bg-[#B28E6B] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
} 