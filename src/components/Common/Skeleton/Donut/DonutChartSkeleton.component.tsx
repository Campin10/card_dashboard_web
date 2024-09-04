const DonutChartSkeletonComponent = () => {
  return (
    <div className="relative w-96 h-96 mx-auto">
      <div className="flex items-center justify-center h-full w-full">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-80 w-80 rounded-full border-[160px] border-gray-300 animate-pulse"></div>
          <div className="absolute h-44 w-44 rounded-full border-4 border-white bg-gray-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DonutChartSkeletonComponent;
