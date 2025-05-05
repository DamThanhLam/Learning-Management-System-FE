
// Toast.tsx
import React, { useEffect } from 'react';
import clsx from 'clsx';

export interface ToastProps {
  open?: boolean;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({ open = true, duration = 3000, onOpenChange, children }) => {
  const [visible, setVisible] = React.useState(open);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onOpenChange?.(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onOpenChange]);

  if (!visible) return null;

  return (
    <div className={clsx(
      'fixed bottom-4 right-4 bg-gray-800 text-white rounded-lg shadow-lg px-4 py-2',
      )}
    >
      {children}
    </div>
  );
};
