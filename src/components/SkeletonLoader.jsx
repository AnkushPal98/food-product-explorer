const SkeletonLoader = () => {
    return (
      <div className="border rounded-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200">Loading...</div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  };

  export default SkeletonLoader;