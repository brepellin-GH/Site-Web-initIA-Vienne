import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5",
      accent: "bg-brand-orange text-white shadow-md shadow-brand-orange/20 hover:bg-brand-orange/90 hover:shadow-lg hover:-translate-y-0.5",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "hover:bg-primary/10 text-primary hover:text-primary",
    };

    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-10 px-4 text-sm",
      lg: "h-14 px-8 text-lg",
      icon: "h-12 w-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:pointer-events-none disabled:opacity-50 active:translate-y-0",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Compatibility export for UI components that import buttonVariants
export function buttonVariants({ variant = "default", size = "default", className = "" }: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"]; className?: string } = {}) {
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5",
    accent: "bg-brand-orange text-white shadow-md shadow-brand-orange/20 hover:bg-brand-orange/90 hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "hover:bg-primary/10 text-primary hover:text-primary",
  };
  const sizes: Record<string, string> = {
    default: "h-12 px-6 py-3",
    sm: "h-10 px-4 text-sm",
    lg: "h-14 px-8 text-lg",
    icon: "h-12 w-12",
  };
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:pointer-events-none disabled:opacity-50 active:translate-y-0",
    variants[variant ?? "default"],
    sizes[size ?? "default"],
    className
  );
}

export { Button };
