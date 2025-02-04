import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContractForm } from "./ContractForm";
import { Contract } from "@/types/contract";
import { useToast } from "@/hooks/use-toast";

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContract: (contract: Contract) => void;
}

export function AddContractModal({
  isOpen,
  onClose,
  onAddContract,
}: AddContractModalProps) {
  const { toast } = useToast();

  const handleSubmit = (data: Contract) => {
    onAddContract(data);
    toast({
      title: "Contrato adicionado",
      description: "O contrato foi adicionado com sucesso.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Contrato</DialogTitle>
        </DialogHeader>
        <ContractForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
