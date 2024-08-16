import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
