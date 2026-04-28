import { useEffect } from 'react';
import type { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
};

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  dismissible = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible && onClose) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismissible, isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={dismissible && onClose ? onClose : undefined}>
      <div
        aria-describedby={description ? 'modal-description' : undefined}
        aria-labelledby="modal-title"
        aria-modal="true"
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Guest profile</p>
            <h2 className="modal__title" id="modal-title">
              {title}
            </h2>
            {description ? (
              <p className="modal__description" id="modal-description">
                {description}
              </p>
            ) : null}
          </div>
          {dismissible && onClose ? (
            <button aria-label="Close dialog" className="modal__close" onClick={onClose} type="button">
              x
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
