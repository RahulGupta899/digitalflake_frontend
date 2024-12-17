import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="overflow-hidden border border-gray-300 rounded-md shadow-sm">
      {/* Table Header Skeleton */}
      <div className="flex bg-gray-200 p-3">
        <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse ml-4"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse ml-4"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse ml-4"></div>
      </div>

      {/* Table Row Skeleton */}
      <div className="divide-y divide-gray-200">
        {[...Array(10)].map((_, idx) => (
          <div key={idx} className="flex bg-white py-3 px-4 space-x-4">
            <div className="w-1/4 h-6 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-1/4 h-6 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-1/4 h-6 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-1/4 h-6 bg-gray-100 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
