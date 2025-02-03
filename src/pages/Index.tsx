import { FileText, Users, AlertTriangle, DollarSign } from "lucide-react";
import { contracts } from "@/data/contracts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ContractsTable } from "@/components/dashboard/ContractsTable";

const Index = () => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard de Contratos</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard
              title="Total de Contratos"
              value={totalContracts}
              icon={<FileText className="h-4 w-4 text-gray-500" />}
            />
            <MetricCard
              title="Contratos Ativos"
              value={activeContracts}
              icon={<Users className="h-4 w-4 text-green-500" />}
            />
            <MetricCard
              title="Próximos ao Vencimento"
              value={nearExpiryContracts}
              icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
            />
            <MetricCard
              title="Valor Total"
              value={`R$ ${totalValue.toLocaleString("pt-BR")}`}
              icon={<DollarSign className="h-4 w-4 text-blue-500" />}
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
