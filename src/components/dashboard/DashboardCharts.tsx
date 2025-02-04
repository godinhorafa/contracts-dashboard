import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
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
interface DashboardChartsProps {
  contracts: Contract[];
}

const monthlyData = [
  { month: "Jan", ativos: 40, expirados: 5, renovados: 35 },
  { month: "Fev", ativos: 45, expirados: 8, renovados: 38 },
  { month: "Mar", ativos: 42, expirados: 6, renovados: 40 },
  { month: "Abr", ativos: 48, expirados: 4, renovados: 42 },
  { month: "Mai", ativos: 50, expirados: 7, renovados: 45 },
  { month: "Jun", ativos: 52, expirados: 5, renovados: 48 },
];

const valueData = [
  { month: "Jan", valor: 150000 },
  { month: "Fev", valor: 180000 },
  { month: "Mar", valor: 160000 },
  { month: "Abr", valor: 200000 },
  { month: "Mai", valor: 220000 },
  { month: "Jun", valor: 240000 },
];

export const DashboardCharts = ({ contracts }: DashboardChartsProps) => {
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
