import {
  FileText,
  Users,
  AlertTriangle,
  DollarSign,
  Clock,
  PercentIcon,
  Plus,
} from "lucide-react";
import { useState, useContext } from "react";
import { contracts as initialContracts } from "@/data/contracts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ContractsTable } from "@/components/dashboard/ContractsTable";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { Button } from "@/components/ui/button";
import { AddContractModal } from "@/components/contracts/AddContractModal";
import { ContractDetailsModal } from "@/components/contracts/ContractDetailsModal";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { FilterProvider } from "@/contexts/FilterContext";
import { Contract } from "@/types/contract";
import { useIsMobile } from "@/hooks/use-mobile";
import { parseCurrency } from "@/utils/currency";
import { ContractsContext } from "@/contexts/ContractsContext";

const Index = () => {
  const { contracts, addContract } = useContext(ContractsContext)!;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Cálculos das métricas
  const totalContracts = contracts.length;
  const activeContracts = contracts.filter((c) => c.Status === "Ativo").length;
  const nearExpiryContracts = contracts.filter(
    (c) => c.Status === "Próximo ao Vencimento"
  ).length;
  const totalValue = contracts
    .filter((c) => c.Status === "Ativo")
    .reduce((acc, curr) => {
      return acc + parseCurrency(curr["Valor do Contrato"]);
    }, 0);

  const expiredContracts = contracts.filter(
    (c) => c.Status === "Expirado"
  ).length;
  const renewalRate = (
    (activeContracts / (activeContracts + expiredContracts)) *
    100
  ).toFixed(1);
  const averageValue = (totalValue / activeContracts).toFixed(2);

  const handleAddContract = (newContract: Contract) => {
    addContract(newContract);
  };

  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDetailsModalOpen(true);
  };

  return (
    <FilterProvider>
      <div className="flex md:flex-row flex-col min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">
                Dashboard de Contratos
              </h1>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Contrato
              </Button>
            </div>

            <GlobalFilters />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MetricCard
                title="Total de Contratos"
                value={totalContracts}
                icon={<FileText />}
                description="Número total de contratos cadastrados no sistema"
                trend={{ value: 5, isPositive: true }}
              />
              <MetricCard
                title="Contratos Ativos"
                value={activeContracts}
                icon={<Users />}
                description="Contratos atualmente em vigor"
                trend={{ value: 2, isPositive: true }}
              />
              <MetricCard
                title="Próximos ao Vencimento"
                value={nearExpiryContracts}
                icon={<AlertTriangle />}
                description="Contratos que vencem nos próximos 30 dias"
                trend={{ value: 3, isPositive: false }}
              />
              <MetricCard
                title="Valor Total"
                value={`R$ ${totalValue.toLocaleString("pt-BR")}`}
                icon={<DollarSign />}
                description="Soma do valor de todos os contratos ativos"
                trend={{ value: 8, isPositive: true }}
              />
              <MetricCard
                title="Taxa de Renovação"
                value={`${renewalRate}%`}
                icon={<PercentIcon />}
                description="Percentual de contratos ativos em relação ao total"
                trend={{ value: 1.5, isPositive: true }}
              />
              <MetricCard
                title="Valor Médio"
                value={`R$ ${parseFloat(averageValue).toLocaleString("pt-BR")}`}
                icon={<Clock />}
                description="Valor médio dos contratos ativos"
                trend={{ value: 4, isPositive: true }}
              />
            </div>

            <div className="mb-6">
              <DashboardCharts contracts={contracts} />
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:p-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Lista de Contratos</h2>
              <ContractsTable
                contracts={contracts}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
        </main>

        <AddContractModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddContract={handleAddContract}
        />

        <ContractDetailsModal
          contract={selectedContract}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedContract(null);
          }}
        />
      </div>
    </FilterProvider>
  );
};

export default Index;
