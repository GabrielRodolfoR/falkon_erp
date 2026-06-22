import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide border transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-brand-sidebar border-brand-border text-brand-secondary",
        success: "bg-brand-accent/10 border-brand-accent/15 text-brand-accent",
        warning: "bg-brand-warning/10 border-brand-warning/15 text-brand-warning",
        danger: "bg-brand-danger/10 border-brand-danger/15 text-brand-danger",
        accent: "bg-brand-accent/15 border-brand-accent/25 text-brand-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
