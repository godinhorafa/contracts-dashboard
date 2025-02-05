import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ContractValueChartProps {
  data: Array<{
    month: string;
    valor: number;
  }>;
}

export const ContractValueChart = ({ data }: ContractValueChartProps) => {
  return (
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
            <LineChart data={data}>
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
  );
};
