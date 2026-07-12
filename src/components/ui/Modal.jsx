import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { cn } from '@utils/cn'
import { MODAL_SIZES } from '@constants/ui'
import { useFocusTrap } from '@hooks/useFocusTrap'

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  showCloseButton = true,
  className,
}) {
  const containerRef = useFocusTrap(isOpen, onClose)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const titleId = 'modal-title'
  const descriptionId = description ? 'modal-description' : undefined

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-overlay"
        aria-label="Close modal"
        onClick={closeOnOverlay ? onClose : undefined}
        tabIndex={-1}
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          'relative z-10 w-full rounded-xl border border-border bg-surface shadow-lg',
          'max-h-[calc(100vh-2rem)] overflow-y-auto',
          MODAL_SIZES[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-text">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-bg hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border p-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
