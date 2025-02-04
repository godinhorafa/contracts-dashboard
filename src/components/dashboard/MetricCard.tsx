import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
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
}

export const MetricCard = ({
  title,
  value,
  icon,
  description,
  trend,
}: MetricCardProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: `${title}`,
      description: `Detalhes sobre ${title.toLowerCase()}: ${value}`,
      duration: 3000,
    });
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer"
      )}
      onClick={handleClick}
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
