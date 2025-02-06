import { createContext, useContext, useState } from "react";
import { Contract } from "@/types/contract";
import { contracts as initialContracts } from "@/data/contracts";

interface ContractsContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
}

const ContractsContext = createContext<ContractsContextType | undefined>(
  undefined
);

export function ContractsProvider({ children }: { children: React.ReactNode }) {
  // Tenta recuperar contratos do localStorage ou usa os iniciais
  const [contracts, setContracts] = useState<Contract[]>(() => {
    const savedContracts = localStorage.getItem("contracts");
    return savedContracts ? JSON.parse(savedContracts) : initialContracts;
  });
  const addContract = (contract: Contract) => {
    setContracts((prev) => {
      const newContracts = [...prev, contract];
      // Salva no localStorage
      localStorage.setItem("contracts", JSON.stringify(newContracts));
      return newContracts;
    });
  };
  return (
    <ContractsContext.Provider value={{ contracts, addContract }}>
      {children}
    </ContractsContext.Provider>
  );
}

export function useContracts() {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error("useContracts must be used within a ContractsProvider");
  }
  return context;
}

export { ContractsContext };
