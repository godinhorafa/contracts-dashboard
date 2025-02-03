import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export const MetricCard = ({
  title,
  value,
  icon,
  description,
  trend,
  onClick,
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer hover:scale-105"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{title}</TooltipTrigger>
              {description && (
                <TooltipContent>
                  <p>{description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <p
              className={cn(
                "text-xs",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}% em relação ao mês
              anterior
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
