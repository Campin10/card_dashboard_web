const CardSkeletonComponent = () => {
  return (
    <div className="max-w-sm w-full mx-auto bg-white shadow-md rounded overflow-hidden animate-pulse min-h-24">
      <div className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4 mt-1"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CardSkeletonComponent;
