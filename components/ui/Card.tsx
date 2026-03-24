import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`border border-[#d8d5ce] bg-transparent p-6 shadow-panel md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
