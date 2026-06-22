import { twMerge } from "tailwind-merge";

export const Card = ({ className, hoverable = true, ...props }) => {
  return (
    <div
      className={twMerge(
        "bg-bg-card border border-border-custom rounded-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out",
        hoverable && "hover:-translate-y-0.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] hover:border-accent-green/10",
        className
      )}
      {...props}
    />
  );
};
