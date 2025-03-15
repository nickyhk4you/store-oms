<nav className="hidden md:flex space-x-8">
  <Link
    href="/"
    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
      pathname === '/' ? 'font-medium' : ''
    }`}
  >
    {t('home')}
  </Link>
  <Link
    href="/orders"
    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
      pathname.startsWith('/orders') ? 'font-medium' : ''
    }`}
  >
    {t('orders')}
  </Link>
  <Link
    href="/products"
    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
      pathname.startsWith('/products') ? 'font-medium' : ''
    }`}
  >
    {t('products')}
  </Link>
  <Link
    href="/inventory"
    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
      pathname.startsWith('/inventory') ? 'font-medium' : ''
    }`}
  >
    {t('inventory')}
  </Link>
  <Link
    href="/dashboard"
    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
      pathname.startsWith('/dashboard') ? 'font-medium' : ''
    }`}
  >
    {t('dashboard')}
  </Link>
</nav>

{isMenuOpen && (
  <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
    <div className="px-4 py-2 space-y-1">
      <Link
        href="/"
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          pathname === '/' 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t('home')}
      </Link>
      <Link
        href="/orders"
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          pathname.startsWith('/orders') 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t('orders')}
      </Link>
      <Link
        href="/products"
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          pathname.startsWith('/products') 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t('products')}
      </Link>
      <Link
        href="/inventory"
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          pathname.startsWith('/inventory') 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t('inventory')}
      </Link>
      <Link
        href="/dashboard"
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          pathname.startsWith('/dashboard') 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t('dashboard')}
      </Link>
    </div>
  </div>
)} 