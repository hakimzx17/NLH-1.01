import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import type { CalloutType } from '../../content/types';

const CALLOUT_CONFIG: Record<CalloutType, { icon: string; label: string }> = {
  'why-matters': { icon: '★', label: 'Why This Matters' },
  'exam-trap': { icon: '⚠', label: 'Exam Trap' },
  'remember': { icon: '◆', label: 'Remember This' },
  'real-world': { icon: '◈', label: 'Real World' },
  'analogy': { icon: '◎', label: 'Analogy' },
};

type CalloutBlockProps = {
  type: CalloutType;
  title?: string;
  children: ReactNode;
};

export function CalloutBlock({ type, title, children }: CalloutBlockProps) {
  const config = CALLOUT_CONFIG[type];
  const heading = title || config.label;

  return (
    <details className={`callout callout--${type}`}>
      <summary className="callout__summary">
        <span className="callout__summary-copy">
          <span className="callout__icon" aria-hidden="true">{config.icon}</span>
          <span className="callout__title">{heading}</span>
        </span>
        <ChevronDown className="callout__chevron" size={18} aria-hidden="true" />
      </summary>
      <div className="callout__content">
        <p className="callout__body">{children}</p>
      </div>
    </details>
  );
}
