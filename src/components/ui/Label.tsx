// Label.tsx
import React from 'react';
import clsx from 'clsx';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, className, children, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={clsx('block text-sm font-medium text-gray-700', className)}
    {...props}
  >
    {children}
  </label>
);


