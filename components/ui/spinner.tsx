import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "animate-spin",
        "data-[icon=inline-start]:-ml-1 data-[icon=inline-start]:mr-2",
        "data-[icon=inline-end]:-mr-1 data-[icon=inline-end]:ml-2",
        className
      )}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
