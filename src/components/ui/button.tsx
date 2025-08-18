import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>img]:w-4 [&>img]:h-4 [&>img]:ml-2",
  {
    variants: {
      variant: {
        default: "bg-primary-deepBlue text-white hover:bg-primary-dodgerBlue [&>img]:filter [&>img]:brightness-0 [&>img]:invert",
        secondary: "bg-white text-primary-deepBlue hover:bg-gray-100 [&>img]:filter [&>img]:brightness-0",
        outline: "border border-primary-deepBlue text-primary-deepBlue hover:bg-primary-deepBlue hover:text-white [&>img]:filter [&>img]:brightness-0 hover:[&>img]:brightness-0 hover:[&>img]:invert",
        ghost: "text-primary-deepBlue hover:bg-neutral-offWhiteBlue [&>img]:filter [&>img]:brightness-0",
        destructive: "bg-red-500 text-white hover:bg-red-600 [&>img]:filter [&>img]:brightness-0 [&>img]:invert",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2",
        lg: "h-14 px-8 py-4 text-lg [&>img]:w-5 [&>img]:h-5",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 