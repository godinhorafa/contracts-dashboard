import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contract } from "@/types/contract";
import { formatCurrency } from "@/utils/currency";
interface ContractDetailsModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
}
export const ContractDetailsModal = ({
  contract,
  isOpen,
  onClose,
}: ContractDetailsModalProps) => {
  if (!contract) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Contrato</DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre o contrato selecionado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Identificador</h3>
              <p className="text-sm text-muted-foreground">
                {contract.Identificador}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Nome do Contrato</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Nome do Contrato"]}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Cliente/Fornecedor</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Cliente/Fornecedor"]}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <p className="text-sm text-muted-foreground">{contract.Status}</p>
            </div>
            <div>
              <h3 className="font-medium">Data de Início</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Data de Início"]}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Data de Vencimento</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Data de Vencimento"]}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Valor do Contrato</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Valor do Contrato"]}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Tipo de Contrato</h3>
              <p className="text-sm text-muted-foreground">
                {contract["Tipo de Contrato"]}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
