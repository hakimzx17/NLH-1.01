import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: boolean;
  glassy?: boolean;
};

export function Card({ children, className = '', accent = false, glassy = true, ...props }: CardProps) {
  const combinedClassName = ['card', glassy ? 'card--glassy' : '', accent ? 'card--accent' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
