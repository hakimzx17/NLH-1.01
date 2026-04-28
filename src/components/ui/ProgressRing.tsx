type ProgressRingProps = {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  valueLabel?: string;
};

export function ProgressRing({
  percent,
  size = 264,
  strokeWidth = 12,
  label,
  valueLabel,
}: ProgressRingProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div
      aria-label={`${label}: ${clampedPercent}%`}
      className="progress-ring"
      role="img"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <svg className="progress-ring__svg" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="progress-ring__content">
        <span className="progress-ring__percent">{valueLabel ?? `${clampedPercent}%`}</span>
        <span className="progress-ring__label">{label}</span>
      </div>
    </div>
  );
}
