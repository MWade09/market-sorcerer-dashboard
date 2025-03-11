
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 transition-transform",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-transform",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showNotification?: boolean
  notificationMessage?: string
  notificationDescription?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showNotification = false, notificationMessage = "Success", notificationDescription = "Operation completed successfully", ...props }, ref) => {
    // Import toast from the Sonner component to avoid circular dependencies
    const { toast } = require("@/components/ui/sonner")
    
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call the original onClick handler if it exists
      if (props.onClick) {
        props.onClick(e);
      }
      
      // Show notification if enabled
      if (showNotification && !props.disabled) {
        toast.success(notificationMessage, {
          description: notificationDescription,
        });
      }
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
