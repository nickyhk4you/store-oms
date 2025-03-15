import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="w-64 space-y-6">
      <ul className="space-y-2">
        <li>
          <Link
            href="/inventory"
            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
              pathname === '/inventory' ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M6 9.75l3 3m0 0l3-3m-3 3v-6m-1.5 12V9.75m0 0l-3-3m3 3l3-3"
              />
            </svg>
            <span className="ml-3">{t('inventory.management')}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 