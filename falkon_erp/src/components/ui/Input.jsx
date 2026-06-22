import React from "react";
import { twMerge } from "tailwind-merge";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full bg-bg-primary text-text-primary border border-border-custom rounded-[10px] px-3 py-2 text-xs placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-green/60 focus:ring-1 focus:ring-accent-green/20 transition-all duration-200 ease-out",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
