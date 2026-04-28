import type { HTMLAttributes, ReactNode } from 'react';

import { Card } from '../ui/Card';

type GlassWidgetProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  children: ReactNode;
  accent?: boolean;
};

export function GlassWidget({ title, children, className = '', accent = false, ...props }: GlassWidgetProps) {
  return (
    <Card accent={accent} className={['glass-widget', className].filter(Boolean).join(' ')} {...props}>
      <p className="glass-widget__title">{title}</p>
      {children}
    </Card>
  );
}
