import React, { createContext, useContext, useState, ReactNode } from "react";
import { Contract } from "@/types/contract";

interface FilterContextType {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  globalStatus: string;
  searchTerm: string;
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
  setGlobalStatus: (status: string) => void;
  setSearchTerm: (term: string) => void;
  filterContracts: (contracts: Contract[]) => Contract[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [globalStatus, setGlobalStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filterContracts = (contracts: Contract[]) => {
    return contracts.filter((contract) => {
      const matchesStatus =
        globalStatus === "all" || contract.Status === globalStatus;
      const matchesSearch =
        searchTerm === "" ||
        Object.values(contract).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      const contractDate = new Date(contract["Data de Vencimento"]);
      const matchesDateRange =
        (!dateRange.start || contractDate >= dateRange.start) &&
        (!dateRange.end || contractDate <= dateRange.end);

      return matchesStatus && matchesSearch && matchesDateRange;
    });
  };

  return (
    <FilterContext.Provider
      value={{
        dateRange,
        globalStatus,
        searchTerm,
        setDateRange,
        setGlobalStatus,
        setSearchTerm,
        filterContracts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
