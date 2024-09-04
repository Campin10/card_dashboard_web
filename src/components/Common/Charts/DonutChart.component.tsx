import { ArcElement, Chart, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Option } from "../../../types/general.type";

interface Props {
  options: Option[];
  labelDataSet: string;
}

export const DonutChartComponents = ({ options, labelDataSet }: Props) => {
  Chart.register(ArcElement);

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.colors.forceOverride;
  defaults.plugins.legend.display = false;
  defaults.plugins.colors.enabled = true;

  if (!options.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No transaction data available to generate the chart</p>
      </div>
    );
  }

  return (
    <Doughnut
      data={{
        labels: options.map((data) => data.label),
        datasets: [
          {
            label: labelDataSet,
            data: options.map((data) => data.value),
            borderRadius: 5,
          },
        ],
      }}
    />
  );
};
