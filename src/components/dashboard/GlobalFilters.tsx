import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFilters } from "@/contexts/FilterContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const GlobalFilters = () => {
  const {
    dateRange,
    globalStatus,
    searchTerm,
    setDateRange,
    setGlobalStatus,
    setSearchTerm,
  } = useFilters();

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="Pesquisar em todos os campos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <Select value={globalStatus} onValueChange={setGlobalStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.start ? (
                dateRange.end ? (
                  <>
                    {format(dateRange.start, "dd/MM/yyyy")} -{" "}
                    {format(dateRange.end, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(dateRange.start, "dd/MM/yyyy")
                )
              ) : (
                "Selecione o período"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.start || new Date()}
              selected={{
                from: dateRange.start || undefined,
                to: dateRange.end || undefined,
              }}
              onSelect={(range) => {
                setDateRange({
                  start: range?.from || null,
                  end: range?.to || null,
                });
              }}
              locale={ptBR}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
