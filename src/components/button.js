import React from "react";
import clsx from "clsx";

export function Button({ variant = "primary", children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx("px-4 py-2 rounded-md text-white ", className, {
        "bg-[#69f0ae] ": variant === "primary",
        "bg-[#607d8b]": variant === "secondary",
      })}
    >
      {children}
    </button>
  );
}
