import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { getButtonClassName } from './buttonClassName';

type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, fullWidth, size, variant })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
