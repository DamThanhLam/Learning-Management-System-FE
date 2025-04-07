import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Thêm onClick để hỗ trợ sự kiện click
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border p-4 cursor-pointer transition hover:shadow-2xl ${className}`}
      onClick={onClick} // Thêm xử lý sự kiện click
    >
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
