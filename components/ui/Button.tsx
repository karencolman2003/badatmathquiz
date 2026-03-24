import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#1a1a18] bg-[#1a1a18] text-[#f7f5f0] hover:bg-[#2a2a28]",
  secondary:
    "border border-[#d8d5ce] bg-transparent text-[#1a1a18] hover:border-[#1a1a18]",
  ghost:
    "border border-transparent bg-transparent text-[#888880] hover:border-[#d8d5ce] hover:text-[#1a1a18]",
};

export function getButtonClassName(variant: ButtonVariant = "primary", className = ""): string {
  return `inline-flex items-center justify-center px-4 py-2 text-[12px] font-medium lowercase tracking-[0.02em] transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
