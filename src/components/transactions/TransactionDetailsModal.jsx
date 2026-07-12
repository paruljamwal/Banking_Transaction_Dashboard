import { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import { TRANSACTION_TYPE_LABELS } from '@constants/transactionTypes'
import { STATUS_LABELS, STATUS_VARIANTS } from '@constants/status'
import { formatCurrency } from '@utils/formatCurrency'
import { formatDate, formatDateTime } from '@utils/formatDate'
import { getAmountColorClass } from '@utils/transactionDisplay'
import { cn } from '@utils/cn'

function DetailField({ label, children, className }) {
  return (
    <div className={cn('space-y-1', className)}>
      <dt className="text-xs font-medium tracking-wide text-text-secondary uppercase">
        {label}
      </dt>
      <dd className="text-sm font-medium text-text break-words">{children}</dd>
    </div>
  )
}

function TransactionDetailsModal({ transaction, isOpen, onClose }) {
  const [receiptStatus, setReceiptStatus] = useState('idle')

  if (!transaction) return null

  const handleDownloadReceipt = () => {
    setReceiptStatus('downloading')

    window.setTimeout(() => {
      setReceiptStatus('done')
      window.setTimeout(() => setReceiptStatus('idle'), 2000)
    }, 800)
  }

  const handleClose = () => {
    setReceiptStatus('idle')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Transaction Details"
      description={transaction.transactionId}
      size="lg"
      footer={
        <>
          {receiptStatus === 'done' && (
            <p className="mr-auto text-sm text-emerald-600">
              Receipt downloaded successfully
            </p>
          )}
          <Button variant="ghost" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            leftIcon={<FiDownload className="h-4 w-4" />}
            loading={receiptStatus === 'downloading'}
            onClick={handleDownloadReceipt}
          >
            Download Receipt
          </Button>
        </>
      }
    >
      <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <DetailField label="Transaction ID">
          <span className="font-mono">{transaction.transactionId}</span>
        </DetailField>

        <DetailField label="Customer Name">{transaction.customerName}</DetailField>

        <DetailField label="Account Number">
          <span className="font-mono text-text-secondary">
            {transaction.accountNumber}
          </span>
        </DetailField>

        <DetailField label="Bank Name">{transaction.bankName}</DetailField>

        <DetailField label="Sender">{transaction.senderName}</DetailField>

        <DetailField label="Receiver">{transaction.receiverName}</DetailField>

        <DetailField label="Transaction Type">
          <Badge variant="primary" size="sm">
            {TRANSACTION_TYPE_LABELS[transaction.transactionType]}
          </Badge>
        </DetailField>

        <DetailField label="Status">
          <Badge
            variant={STATUS_VARIANTS[transaction.status] || 'default'}
            size="sm"
            dot
          >
            {STATUS_LABELS[transaction.status]}
          </Badge>
        </DetailField>

        <DetailField label="Amount">
          <span
            className={cn(
              'text-base font-semibold',
              getAmountColorClass(
                transaction.transactionType,
                transaction.status,
              ),
            )}
          >
            {formatCurrency(transaction.amount)}
          </span>
        </DetailField>

        <DetailField label="Payment Method">{transaction.paymentMethod}</DetailField>

        <DetailField label="Category">{transaction.category}</DetailField>

        <DetailField label="Transaction Date">
          {formatDate(transaction.date)}
        </DetailField>

        <DetailField label="Description" className="sm:col-span-2">
          <span className="font-normal text-text-secondary">
            {transaction.description}
          </span>
        </DetailField>

        <DetailField label="Created Time">
          {formatDateTime(transaction.createdTime || transaction.date)}
        </DetailField>
      </dl>
    </Modal>
  )
}

export default TransactionDetailsModal
