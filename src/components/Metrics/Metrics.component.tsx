import { useMemo } from "react";
import {
  formatCentsToUSD,
  formatNameCategory,
} from "../../helpers/format.helper";
import { Option } from "../../types/general.type";
import { IMetrics } from "../../types/metrics.type";
import { CardComponent } from "../Common/Card/Card.component";
import { DonutChartComponents } from "../Common/Charts/DonutChart.component";
import CardSkeleton from "../Common/Skeleton/Card/CardSkeleton.component";
import DonutChartSkeletonComponent from "../Common/Skeleton/Donut/DonutChartSkeleton.component";

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  metrics: IMetrics | undefined;
}
const MetricsComponent = ({ isLoading, isFetching, metrics }: Props) => {
  const transactionsByCategory: Option[] = useMemo(() => {
    if (!metrics) return [];
    return Object.entries(metrics.transactionsGroupedByCategory).map(
      ([category, value]) => ({
        label: formatNameCategory(category),
        value,
      })
    );
  }, [metrics]);

  const isDataLoading = isLoading || isFetching;

  return (
    <>
      <section>
        <div className="grid grid-cols-2 gap-4 ">
          {isDataLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <CardComponent
                title="Total Card Spend"
                amount={formatCentsToUSD(metrics?.totalAmountSpent)}
              />
              <CardComponent
                title="Average Transaction"
                amount={formatCentsToUSD(metrics?.averageTransactionAmount)}
              />
            </>
          )}
        </div>
      </section>
      <section className="h-96">
        <h1 className="text-l mt-10 mb-2">Transactions by category</h1>
        {isDataLoading ? (
          <DonutChartSkeletonComponent />
        ) : (
          <DonutChartComponents
            options={transactionsByCategory}
            labelDataSet="Transactions"
          />
        )}
      </section>
    </>
  );
};

export default MetricsComponent;
