import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, parseCurrency } from "@/utils/currency";
import { formatDateToBrazilian } from "@/utils/formatters";

const contractFormSchema = z.object({
  Identificador: z.string().min(1, "Identificador é obrigatório"),
  "Nome do Contrato": z.string().min(1, "Nome do contrato é obrigatório"),
  "Cliente/Fornecedor": z.string().min(1, "Cliente/Fornecedor é obrigatório"),
  "Data de Início": z.string().min(1, "Data de início é obrigatória"),
  "Data de Vencimento": z.string().min(1, "Data de vencimento é obrigatória"),
  Status: z.string().min(1, "Status é obrigatório"),
  "Valor do Contrato": z.string().min(1, "Valor do contrato é obrigatório"),
  "Tipo de Contrato": z.string().min(1, "Tipo de contrato é obrigatório"),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onSubmit: (data: ContractFormValues) => void;
  onCancel: () => void;
}

export function ContractForm({ onSubmit, onCancel }: ContractFormProps) {
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      Identificador: "",
      "Nome do Contrato": "",
      "Cliente/Fornecedor": "",
      "Data de Início": "",
      "Data de Vencimento": "",
      Status: "",
      "Valor do Contrato": "",
      "Tipo de Contrato": "",
    },
  });

  const handleSubmit = (data: ContractFormValues) => {
    const formattedData = {
      ...data,
      "Data de Início": formatDateToBrazilian(data["Data de Início"]),
      "Data de Vencimento": formatDateToBrazilian(data["Data de Vencimento"]),
      "Valor do Contrato": formatCurrency(
        parseCurrency(data["Valor do Contrato"])
      ),
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Identificador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificador</FormLabel>
              <FormControl>
                <Input placeholder="CT-XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Nome do Contrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Contrato</FormLabel>
              <FormControl>
                <Input placeholder="Nome do contrato" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Cliente/Fornecedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente/Fornecedor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do cliente ou fornecedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Data de Início"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Início</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Data de Vencimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Vencimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Expirado">Expirado</SelectItem>
                  <SelectItem value="Pendente de Renovação">
                    Pendente de Renovação
                  </SelectItem>
                  <SelectItem value="Próximo ao Vencimento">
                    Próximo ao Vencimento
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Valor do Contrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor do Contrato</FormLabel>
              <FormControl>
                <Input
                  placeholder="R$ 0,00"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formattedValue = formatCurrency(Number(value) / 100);
                    field.onChange(formattedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Tipo de Contrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Contrato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Serviço">Serviço</SelectItem>
                  <SelectItem value="Fornecimento">Fornecimento</SelectItem>
                  <SelectItem value="Consultoria">Consultoria</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar Contrato</Button>
        </div>
      </form>
    </Form>
  );
}
