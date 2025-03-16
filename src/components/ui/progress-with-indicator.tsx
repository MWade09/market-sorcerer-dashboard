
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressWithIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  indicatorClassName?: string
}

const ProgressWithIndicator = React.forwardRef<HTMLDivElement, ProgressWithIndicatorProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = (value / max) * 100

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)
ProgressWithIndicator.displayName = "ProgressWithIndicator"

export { ProgressWithIndicator }
