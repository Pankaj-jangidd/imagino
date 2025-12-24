import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-purple-500/20 text-purple-400",
        secondary: "border-transparent bg-white/10 text-white/80",
        destructive: "border-transparent bg-red-500/20 text-red-400",
        outline: "border-white/20 bg-transparent text-white/70",
        success: "border-transparent bg-emerald-500/20 text-emerald-400",
        accent: "border-transparent bg-cyan-500/20 text-cyan-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
