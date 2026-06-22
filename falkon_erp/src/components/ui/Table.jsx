import { twMerge } from "tailwind-merge";

export const Table = ({ className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={twMerge("w-full border-collapse text-left text-xs", className)} {...props} />
    </div>
  );
};

export const THead = ({ className, ...props }) => {
  return (
    <thead
      className={twMerge(
        "border-b border-border-custom text-text-secondary/70 uppercase text-[10px] font-semibold tracking-wider",
        className
      )}
      {...props}
    />
  );
};

export const TBody = ({ className, ...props }) => {
  return <tbody className={twMerge("divide-y divide-border-custom/30", className)} {...props} />;
};

export const TR = ({ className, ...props }) => {
  return (
    <tr
      className={twMerge(
        "hover:bg-bg-hover/30 transition-colors duration-150 group",
        className
      )}
      {...props}
    />
  );
};

export const TH = ({ className, ...props }) => {
  return <th className={twMerge("px-6 py-4 font-medium", className)} {...props} />;
};

export const TD = ({ className, ...props }) => {
  return <td className={twMerge("px-6 py-5 align-middle text-text-primary", className)} {...props} />;
};
