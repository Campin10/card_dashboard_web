import dayjs from "dayjs";
import { useMemo } from "react";
import {
  formatCentsToUSD,
  formatNameCategory,
} from "../../helpers/format.helper";
import useGetActivity from "../../hooks/query/useGetActivity.hook";
import useLastPageItemObserver from "../../hooks/useLastPageItemObserver.hook";
import ChipStateComponent from "../Common/Chip/ChipState.component";
import TableSkeletonComponent from "../Common/Skeleton/Table/TableSkeleton.component";

interface Props {
  metricsLoaded: boolean;
  cardId: string;
}

const ActivityComponent = ({ metricsLoaded, cardId }: Props) => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetActivity(cardId, metricsLoaded);

  const lastElementRef = useLastPageItemObserver({
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
  });

  const activityList = useMemo(
    () => data?.pages.flatMap((page) => page.items) || [],
    [data]
  );

  return (
    <div>
      <h1 className="text-lg mb-2">Activity</h1>
      {isLoading || !metricsLoaded ? (
        <TableSkeletonComponent />
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              {["Type", "Amount", "Category", "Date"].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activityList.map((item) => (
              <tr ref={lastElementRef} key={item.created}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.amount > 0 ? (
                    <div className="flex flex-col items-start gap-1">
                      Authorization
                      <ChipStateComponent approved={item.state} />
                    </div>
                  ) : (
                    <p className="text-left">Transaction</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCentsToUSD(item.amount)}
                </td>
                <td className="px-6 py-4 max-w-[200px] whitespace-nowrap text-sm text-gray-500 overflow-hidden truncate">
                  {formatNameCategory(item.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dayjs.unix(item.created).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityComponent;
