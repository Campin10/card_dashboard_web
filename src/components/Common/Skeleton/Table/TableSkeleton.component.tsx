interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  rowHeight?: string;
  columnWidth?: string;
}

const TableSkeletonComponent: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  rowHeight = "h-4",
  columnWidth = "w-full",
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg animate-pulse">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: columns }).map((_, index) => (
            <th key={index} className="px-6 py-3">
              <div
                className={`bg-gray-300 rounded ${rowHeight} w-3/4 mx-auto`}
              ></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`bg-gray-300 rounded ${rowHeight} ${columnWidth}`}
                ></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeletonComponent;
