import type { ReactNode } from 'react';

type TooltipProps = {
  content: string;
  children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltip__bubble" role="tooltip">
        {content}
      </span>
    </span>
  );
}
