import React from 'react';

const DotLoading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex space-x-2">
        <div className="h-3 w-3 animate-pulse rounded-full bg-gray-600"></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-gray-600 delay-200"></div>
        <div className="delay-400 h-3 w-3 animate-pulse rounded-full bg-gray-600"></div>
      </div>
    </div>
  );
};

export default DotLoading;
