import { useContracts } from "@/contexts/ContractsContext";
import { ContractsTable } from "@/components/dashboard/ContractsTable";
import { FilterProvider } from "@/contexts/FilterContext";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { Sidebar } from "@/components/dashboard/Sidebar";

const Contracts = () => {
  const { contracts } = useContracts();

  return (
    <FilterProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Contratos</h1>
            </div>
            <GlobalFilters />

            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <ContractsTable contracts={contracts} />
            </div>
          </div>
        </main>
      </div>
    </FilterProvider>
  );
};
export default Contracts;
