type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonClassOptions = {}): string {
  return [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
