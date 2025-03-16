
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  isLoading?: boolean;
}

export const MetricCard = ({
  label,
  value,
  change,
  isLoading = false,
}: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="transition-all duration-300 hover:shadow-glow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-[100px]" />
          ) : (
            <div className="flex items-center">
              <h3 className="text-2xl font-semibold">{value}</h3>
              {(isPositive || isNegative) && (
                <div
                  className={cn(
                    "flex items-center ml-2 text-sm font-medium",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
