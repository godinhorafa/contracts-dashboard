import { Contract } from "@/types/contract";
import { useFilters } from "@/contexts/FilterContext";
import { ContractEvolutionChart } from "./charts/ContractEvolutionChart";
import { ContractValueChart } from "./charts/ContractValueChart";
import {
  processMonthlyData,
  processValueData,
} from "@/utils/chartDataProcessors";

interface DashboardChartsProps {
  contracts: Contract[];
}

export const DashboardCharts = ({ contracts }: DashboardChartsProps) => {
  const { filterContracts } = useFilters();
  const filteredContracts = filterContracts(contracts);

  const monthlyData = processMonthlyData(filteredContracts);
  const valueData = processValueData(filteredContracts);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ContractEvolutionChart data={monthlyData} />
      <ContractValueChart data={valueData} />
    </div>
  );
};
