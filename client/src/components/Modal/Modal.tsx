import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOutsideClick = true,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleBodyScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      handleBodyScroll();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && event.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div ref={modalRef} className={css.backdrop} onClick={handleOutsideClick}>
      <div className={`${css.modal} ${className}`}>
        <div className={css.modalHeader}>
          {title && <h2 className={css.modalTitle}>{title}</h2>}
          {showCloseButton && (
            <button
              className={css.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
        <div className={css.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
