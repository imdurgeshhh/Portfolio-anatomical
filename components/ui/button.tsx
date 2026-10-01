import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 dark:focus-visible:ring-[#F5C451]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border border-black hover:bg-black hover:text-white dark:bg-[#F5C451] dark:text-black dark:border-[#F5C451] dark:hover:bg-[#e0b038] shadow-sm",
        secondary:
          "bg-black/5 text-black hover:bg-black/10 border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:bg-white/20",
        outline:
          "border border-black/20 bg-transparent hover:bg-black/5 text-black dark:border-white/20 dark:text-white dark:hover:bg-white/10",
        ghost: "hover:bg-black/5 text-black dark:hover:bg-white/10 dark:text-white",
        link: "text-black underline-offset-4 hover:underline dark:text-[#F5C451]",
      },
      size: {
        default: "min-h-[44px] px-6 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const combinedClasses = cn(buttonVariants({ variant, size, className }));

    if (href) {
      if (href.startsWith("http")) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button className={combinedClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
