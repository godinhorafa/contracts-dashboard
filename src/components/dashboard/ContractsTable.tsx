import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Contract } from "@/types/contract";
import { ArrowUpDown } from "lucide-react";

interface ContractsTableProps {
  contracts: Contract[];
  onRowClick?: (contract: Contract) => void;
}

export const ContractsTable = ({
  contracts,
  onRowClick,
}: ContractsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Contract | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  // Filtrar contratos
  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus =
      statusFilter === "all" || contract.Status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      Object.values(contract).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  // Ordenar contratos
  const sortedContracts = [...filteredContracts].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Paginação
  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContracts = sortedContracts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: keyof Contract) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Expirado">Expirado</SelectItem>
              <SelectItem value="Próximo ao Vencimento">
                Próximo ao Vencimento
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("Identificador")}
                className="cursor-pointer"
              >
                ID <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("Nome do Contrato")}
                className="cursor-pointer"
              >
                Nome <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("Cliente/Fornecedor")}
                className="cursor-pointer"
              >
                Cliente/Fornecedor <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("Status")}
                className="cursor-pointer"
              >
                Status <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("Valor do Contrato")}
                className="cursor-pointer"
              >
                Valor <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("Data de Vencimento")}
                className="cursor-pointer"
              >
                Vencimento <ArrowUpDown className="inline h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContracts.map((contract) => (
              <TableRow
                key={contract.Identificador}
                onClick={() => onRowClick?.(contract)}
                className="cursor-pointer hover:bg-muted/60"
              >
                <TableCell>{contract.Identificador}</TableCell>
                <TableCell>{contract["Nome do Contrato"]}</TableCell>
                <TableCell>{contract["Cliente/Fornecedor"]}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contract.Status === "Ativo"
                        ? "bg-green-100 text-green-800"
                        : contract.Status === "Próximo ao Vencimento"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {contract.Status}
                  </span>
                </TableCell>
                <TableCell>{contract["Valor do Contrato"]}</TableCell>
                <TableCell>{contract["Data de Vencimento"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
