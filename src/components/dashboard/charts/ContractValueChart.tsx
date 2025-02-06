import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Contract } from "@/types/contract";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContractValueChartProps {
  data: Array<{
    month: string;
    valor: number;
  }>;
}

const ContractValueChart = ({ data }: ContractValueChartProps) => {
  const isMobile = useIsMobile();

  // Encontrar o valor máximo para definir o domínio do eixo Y
  const maxValue = Math.max(...data.map((item) => item.valor));
  const yAxisDomain = [0, Math.ceil(maxValue * 1.1)]; // Adiciona 10% de margem

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valor Total dos Contratos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={isMobile ? "h-[200px]" : "h-[300px]"}>
          <ChartContainer
            config={{
              valor: { theme: { light: "#1E40AF", dark: "#60A5FA" } },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} className="max-w-full max-h-full">
                <XAxis dataKey="month" />
                <YAxis
                  domain={yAxisDomain}
                  tickFormatter={(value) =>
                    value >= 1000000
                      ? `R$ ${(value / 1000000).toFixed(1)}M`
                      : `R$ ${(value / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    `R$ ${value.toLocaleString("pt-BR", {
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
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractValueChart;
