import { Contract } from "@/types/contract";
import { useFilters } from "@/contexts/FilterContext";
import { ContractEvolutionChart } from "./charts/ContractEvolutionChart";
import ContractValueChart from "./charts/ContractValueChart";
import {
  processMonthlyData,
  processValueData,
} from "@/utils/chartDataProcessors";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardChartsProps {
  contracts: Contract[];
}

export const DashboardCharts = ({ contracts }: DashboardChartsProps) => {
  const { filterContracts } = useFilters();
  const filteredContracts = filterContracts(contracts);
  const isMobile = useIsMobile();

  const monthlyData = processMonthlyData(filteredContracts);
  const valueData = processValueData(filteredContracts);

  return (
    <div
      className={`grid gap-4 ${
        isMobile ? "grid-cols-1" : "md:grid-cols-2"
      } w-full max-w-full`}
    >
      <ContractEvolutionChart data={monthlyData} />
      <ContractValueChart data={valueData} />
    </div>
  );
};
