# Store OMS - Omnichannel Order Management System

## Project Overview

Store OMS is a comprehensive omnichannel order management system designed for retail businesses. It helps enterprises efficiently manage orders, inventory, products, and sales channels across multiple platforms. The system features a bilingual interface (English and Chinese), intuitive data visualization, and powerful inventory management capabilities, enabling businesses to easily navigate the complexities of multichannel sales.

## Key Features

### 1. Order Management
- **Multichannel Order Integration**: Centrally manage orders from Taobao, JD.com, Xiaohongshu, Douyin, WeChat Mini Programs, and offline stores
- **Order Status Tracking**: Monitor orders in real-time from creation to completion
- **Bulk Order Processing**: Support for batch editing, exporting, and processing orders
- **Order Filtering & Search**: Filter orders by date, channel, status, and other dimensions
- **Order Details**: View comprehensive order information including customer data, product details, and payment status

### 2. Inventory Management
- **Omnichannel Inventory Overview**: Visualize inventory distribution and status across all channels
- **Inventory Alert System**: Automatic notifications for low stock and out-of-stock situations
- **Inventory Adjustment & Transfer**: Easily adjust inventory and transfer between warehouses
- **Inventory Activity Log**: Record all inventory changes for traceability
- **Channel Inventory Synchronization**: Ensure consistency between online and offline inventory data
- **Inventory Analysis Reports**: Provide key metrics such as inventory turnover rate and efficiency

### 3. Product Management
- **Product Catalog Management**: Centrally manage all product information
- **Product Categories & Tags**: Flexible organization of product structure
- **Product Detail Editing**: Manage product descriptions, images, pricing, and more
- **SKU Management**: Support for multi-specification product management
- **Product Import/Export**: Batch processing of product data

### 4. Channel Management
- **Multi-channel Integration**: Support for major e-commerce platforms and offline stores
- **Channel Inventory Allocation**: Intelligently allocate inventory to different sales channels
- **Channel Performance Analysis**: Analyze sales performance across channels
- **Channel Sync Status**: Monitor data synchronization status for all channels

### 5. Data Analysis & Reporting
- **Sales Data Analysis**: Analyze sales trends, best-selling products, and more
- **Inventory Reports**: Generate reports on inventory status, value, and turnover rate
- **Channel Performance Reports**: Evaluate the performance of each sales channel
- **Data Visualization**: Display key business metrics through intuitive charts and graphs

### 6. System Features
- **Multilingual Support**: Complete support for English and Chinese interfaces
- **Responsive Design**: Adapts to desktop and mobile devices
- **Dark Mode**: Support for both light and dark interface themes
- **User Permission Management**: Role-based access control

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Data Visualization**: Chart.js
- **Internationalization**: Custom language context

## Installation & Usage

### System Requirements
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/nickyhk4you/store-oms.git
cd store-oms
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
store-oms/
├── public/            # Static assets
├── src/               # Source code
│   ├── app/           # Application pages
│   │   ├── components/    # Shared components
│   │   ├── contexts/      # Context providers
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── inventory/     # Inventory management pages
│   │   ├── orders/        # Order management pages
│   │   ├── products/      # Product management pages
│   │   └── utils/         # Utility functions
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
├── .eslintrc.json     # ESLint configuration
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Future Plans

- Integration with additional payment gateways
- Addition of Customer Relationship Management (CRM) features
- Development of a mobile application version
- Enhanced data analysis and prediction capabilities
- Support for more languages and regional settings

## Contributing

We welcome community contributions! If you'd like to contribute to Store OMS, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contact

Project Maintainer - Nicolas Hu


---

© 2023 Store OMS. All rights reserved.