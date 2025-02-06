import { useContracts } from "@/contexts/ContractsContext";
import { ContractsTable } from "@/components/dashboard/ContractsTable";
import { FilterProvider } from "@/contexts/FilterContext";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddContractModal } from "@/components/contracts/AddContractModal";
import { ContractDetailsModal } from "@/components/contracts/ContractDetailsModal";
import { Contract } from "@/types/contract";

const Contracts = () => {
  const { contracts, addContract } = useContracts();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleAddContract = (newContract: Contract) => {
    addContract(newContract);
  };

  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDetailsModalOpen(true);
  };

  return (
    <FilterProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Contratos</h1>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Contrato
              </Button>
            </div>
            <GlobalFilters />

            <div className="bg-white rounded-lg shadow p-6 mt-8">
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

export default Contracts;
