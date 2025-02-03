import {
  FileText,
  Users,
  AlertTriangle,
  DollarSign,
  Clock,
  PercentIcon,
} from "lucide-react";
import { contracts } from "@/data/contracts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ContractsTable } from "@/components/dashboard/ContractsTable";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter((c) => c.Status === "Ativo").length;
  const nearExpiryContracts = contracts.filter(
    (c) => c.Status === "Próximo ao Vencimento"
  ).length;
  const totalValue = contracts
    .filter((c) => c.Status === "Ativo")
    .reduce((acc, curr) => {
      const value = parseFloat(
        curr["Valor do Contrato"]
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      );
      return acc + value;
    }, 0);

  // Cálculo da taxa de renovação
  const expiredContracts = contracts.filter(
    (c) => c.Status === "Expirado"
  ).length;
  const renewalRate = (
    (activeContracts / (activeContracts + expiredContracts)) *
    100
  ).toFixed(1);
  // Cálculo do valor médio dos contratos
  const averageValue = (totalValue / activeContracts).toFixed(2);
  const handleMetricClick = (metricName: string) => {
    toast({
      title: `Detalhes - ${metricName}`,
      description: "Em breve: mais detalhes sobre esta métrica",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard de Contratos</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            <MetricCard
              title="Total de Contratos"
              value={totalContracts}
              icon={<FileText />}
              description="Número total de contratos cadastrados no sistema"
              onClick={() => handleMetricClick("Total de Contratos")}
              trend={{ value: 5, isPositive: true }}
            />
            <MetricCard
              title="Contratos Ativos"
              value={activeContracts}
              icon={<Users />}
              description="Contratos atualmente em vigor"
              onClick={() => handleMetricClick("Contratos Ativos")}
              trend={{ value: 2, isPositive: true }}
            />
            <MetricCard
              title="Próximos ao Vencimento"
              value={nearExpiryContracts}
              icon={<AlertTriangle />}
              description="Contratos que vencem nos próximos 30 dias"
              onClick={() => handleMetricClick("Próximos ao Vencimento")}
              trend={{ value: 3, isPositive: false }}
            />
            <MetricCard
              title="Valor Total"
              value={`R$ ${totalValue.toLocaleString("pt-BR")}`}
              icon={<DollarSign />}
              description="Soma do valor de todos os contratos ativos"
              onClick={() => handleMetricClick("Valor Total")}
              trend={{ value: 8, isPositive: true }}
            />
            <MetricCard
              title="Taxa de Renovação"
              value={`${renewalRate}%`}
              icon={<PercentIcon />}
              description="Percentual de contratos ativos em relação ao total"
              onClick={() => handleMetricClick("Taxa de Renovação")}
              trend={{ value: 1.5, isPositive: true }}
            />
            <MetricCard
              title="Valor Médio"
              value={`R$ ${parseFloat(averageValue).toLocaleString("pt-BR")}`}
              icon={<Clock />}
              description="Valor médio dos contratos ativos"
              onClick={() => handleMetricClick("Valor Médio")}
              trend={{ value: 4, isPositive: true }}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Lista de Contratos</h2>
            <ContractsTable contracts={contracts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
