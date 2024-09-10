import { useQueries } from "react-query";
import { PieChart } from "../components/charts/pie-chart";
import { getChartBy, getTotalBy } from "../services/summarizers";
import { ChartsBy, TotalBy } from "../types/summarizers";

export function Home() {
  const [
    chartStateQuery,
    chartAreaQuery,
    chartCropQuery,
    totalAreaQuery,
    TotalFarmQuery,
  ] = useQueries([
    {
      queryKey: ["charts", ChartsBy.state],
      queryFn: () => getChartBy(ChartsBy.state),
    },
    {
      queryKey: ["charts", ChartsBy.area],
      queryFn: () => getChartBy(ChartsBy.area),
    },
    {
      queryKey: ["charts", ChartsBy.crop],
      queryFn: () => getChartBy(ChartsBy.crop),
    },
    {
      queryKey: ["total", TotalBy.area],
      queryFn: () => getTotalBy(TotalBy.area),
    },
    {
      queryKey: ["total", TotalBy.farm],
      queryFn: () => getTotalBy(TotalBy.farm),
    },
  ]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <div className="flex items-center justify-between w-full p-2 mb-4 text-sm font-bold bg-gray-100 rounded">
          <span className="text-gray-600 ">
            Total de fazendas em quantidade
          </span>
          <span>{totalAreaQuery.data?.total}</span>
        </div>

        <div className="flex items-center justify-between w-full p-2 mb-4 text-sm font-bold bg-gray-100 rounded">
          <span className="text-gray-600">
            Total de fazendas em hectares (área total)
          </span>
          <span>{TotalFarmQuery.data?.total}</span>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {chartAreaQuery.isFetched && chartAreaQuery.data && (
          <PieChart data={chartAreaQuery.data} title="Uso do solo" />
        )}
        {chartStateQuery.isFetched && chartStateQuery.data && (
          <PieChart data={chartStateQuery.data} title="Estado" />
        )}
        {chartCropQuery.isFetched && chartCropQuery.data && (
          <PieChart data={chartCropQuery.data} title="Cultura" />
        )}
      </div>
    </div>
  );
}
