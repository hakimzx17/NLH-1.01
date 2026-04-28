import type { HTMLAttributes, ReactNode } from 'react';

type BadgeTone = 'neutral' | 'locked' | 'available' | 'in-progress' | 'passed' | 'failed' | 'complete';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, className = '', tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span className={['badge', `badge--${tone}`, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  );
}
