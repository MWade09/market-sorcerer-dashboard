
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressWithIndicatorProps {
  value: number;
  max: number;
  className?: string;
  indicatorClassName?: string;
}

const ProgressWithIndicator = ({
  value,
  max,
  className,
  indicatorClassName,
}: ProgressWithIndicatorProps) => {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-full", className)}>
      <Progress value={value} max={max} className={className} />
      <div
        className={cn("absolute top-0 left-0 h-full", indicatorClassName)}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

export { ProgressWithIndicator };
