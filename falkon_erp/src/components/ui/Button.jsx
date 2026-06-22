import React from "react";
import { twMerge } from "tailwind-merge";

export const Button = React.forwardRef(({ className, variant = "primary", size = "sm", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        "inline-flex items-center justify-center font-medium rounded-[10px] transition-all duration-200 ease-out focus:outline-none cursor-pointer active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        // Variants
        variant === "primary" && "bg-accent-green text-[#09090B] font-semibold hover:brightness-[1.05] shadow-glow-green hover:shadow-glow-green-hover hover:-translate-y-0.5",
        variant === "secondary" && "bg-transparent border border-border-custom text-text-primary hover:bg-bg-hover hover:border-text-secondary/20 hover:-translate-y-0.5",
        variant === "ghost" && "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover",
        // Sizes
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";
