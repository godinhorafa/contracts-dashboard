import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contract } from "@/types/contract";

interface ContractsTableProps {
  contracts: Contract[];
}

export const ContractsTable = ({ contracts }: ContractsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Cliente/Fornecedor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.Identificador}>
              <TableCell>{contract.Identificador}</TableCell>
              <TableCell>{contract["Nome do Contrato"]}</TableCell>
              <TableCell>{contract["Cliente/Fornecedor"]}</TableCell>
              <TableCell>{contract.Status}</TableCell>
              <TableCell>{contract["Valor do Contrato"]}</TableCell>
              <TableCell>{contract["Data de Vencimento"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
