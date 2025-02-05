import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import { Contract } from "@/types/contract";
import { useFilters } from "@/contexts/FilterContext";

interface DashboardChartsProps {
  contracts: Contract[];
}

export const DashboardCharts = ({ contracts }: DashboardChartsProps) => {
  const { filterContracts } = useFilters();
  const filteredContracts = filterContracts(contracts);

  // Processar dados para os gráficos usando contratos filtrados
  const processMonthlyData = () => {
    const monthlyStats = new Map();
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    filteredContracts.forEach((contract) => {
      const date = new Date(
        contract["Data de Início"].split("/").reverse().join("-")
      );
      const month = months[date.getMonth()];

      if (!monthlyStats.has(month)) {
        monthlyStats.set(month, {
          month,
          ativos: 0,
          expirados: 0,
          renovados: 0,
        });
      }

      const stats = monthlyStats.get(month);
      if (contract.Status === "Ativo") stats.ativos++;
      else if (contract.Status === "Expirado") stats.expirados++;
      else if (contract.Status === "Pendente de Renovação") stats.renovados++;
    });

    return Array.from(monthlyStats.values());
  };

  const processValueData = () => {
    const valueStats = new Map();
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    filteredContracts.forEach((contract) => {
      const date = new Date(
        contract["Data de Início"].split("/").reverse().join("-")
      );
      const month = months[date.getMonth()];

      if (!valueStats.has(month)) {
        valueStats.set(month, { month, valor: 0 });
      }

      const stats = valueStats.get(month);
      const valor = parseFloat(
        contract["Valor do Contrato"]
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      );
      stats.valor += valor;
    });

    return Array.from(valueStats.values());
  };

  const monthlyData = processMonthlyData();
  const valueData = processValueData();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                ativos: { theme: { light: "#1E40AF", dark: "#60A5FA" } },
                expirados: { theme: { light: "#DC2626", dark: "#EF4444" } },
                renovados: { theme: { light: "#059669", dark: "#34D399" } },
              }}
            >
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload) return null;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          {payload.map((entry) => (
                            <div key={entry.name}>
                              <p className="text-sm font-medium">
                                {entry.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {entry.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="ativos"
                  name="Ativos"
                  fill="var(--color-ativos)"
                />
                <Bar
                  dataKey="expirados"
                  name="Expirados"
                  fill="var(--color-expirados)"
                />
                <Bar
                  dataKey="renovados"
                  name="Renovados"
                  fill="var(--color-renovados)"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Valor Total dos Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                valor: { theme: { light: "#1E40AF", dark: "#60A5FA" } },
              }}
            >
              <LineChart data={valueData}>
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) =>
                    `R$ ${Number(value).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name="Valor Total"
                  stroke="var(--color-valor)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-valor)" }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
