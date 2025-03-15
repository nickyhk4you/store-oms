import Link from "next/link";
import { getTranslations } from "../utils/translations";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  const language = 'zh'; // 从 cookie 或其他服务器端方法获取
  const t = (key: string) => getTranslations(language, key);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
      <div className="mx-auto text-gray-400 dark:text-gray-500 mb-4">
        {icon}
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{t('coming.soon')}</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        {description}
      </p>
      
      <Link href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        {t('home')}
      </Link>
    </div>
  );
} 