import * as React from "react";

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // nếu bạn muốn hỗ trợ click trên title
}

export function CardTitle({ children, className, onClick }: CardTitleProps) {
  return (
    <h2
      className={`text-xl font-semibold text-gray-900 mb-2 cursor-default ${className}`}
      onClick={onClick}
    >
      {children}
    </h2>
  );
}
