import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Contract } from "@/types/contract";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContractEvolutionChartProps {
  data: Array<{
    month: string;
    ativos: number;
    expirados: number;
    renovados: number;
  }>;
}

export const ContractEvolutionChart = ({
  data,
}: ContractEvolutionChartProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução de Contratos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={isMobile ? "h-[200px]" : "h-[300px]"}>
          <ChartContainer
            config={{
              ativos: { theme: { light: "#1E40AF", dark: "#60A5FA" } },
              expirados: { theme: { light: "#DC2626", dark: "#EF4444" } },
              renovados: { theme: { light: "#059669", dark: "#34D399" } },
            }}
            className="w-full h-full"
          >
            <BarChart data={data} className="max-w-full max-h-full">
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
                            <p className="text-sm font-medium">{entry.name}</p>
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
              <Bar dataKey="ativos" name="Ativos" fill="var(--color-ativos)" />
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
  );
};
