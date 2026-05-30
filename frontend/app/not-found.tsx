'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12 max-w-md w-full shadow-lg">
        
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4 animate-bounce">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition"
        >
          Go back to Home
        </Link>

        <div className="mt-5 text-sm text-gray-500">
          Or try navigating from the homepage.
        </div>

      </div>
    </div>
  );
}