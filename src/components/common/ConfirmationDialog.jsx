import { FiAlertTriangle } from 'react-icons/fi'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm action',
  message,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
  icon,
  size = 'sm',
}) {
  const bodyText = message || description

  const handleConfirm = () => {
    onConfirm?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      showCloseButton={!loading}
      closeOnOverlay={!loading}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600"
          aria-hidden="true"
        >
          {icon || <FiAlertTriangle className="h-5 w-5" />}
        </div>
        {bodyText && (
          <p className="text-sm leading-relaxed text-text-secondary">{bodyText}</p>
        )}
      </div>
    </Modal>
  )
}

export default ConfirmationDialog
