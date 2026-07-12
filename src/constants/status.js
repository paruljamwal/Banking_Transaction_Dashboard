export const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  PROCESSING: 'processing',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

export const STATUS_LABELS = {
  [STATUS.PENDING]: 'Pending',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.FAILED]: 'Failed',
  [STATUS.CANCELLED]: 'Cancelled',
  [STATUS.PROCESSING]: 'Processing',
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive',
}

export const STATUS_VARIANTS = {
  [STATUS.PENDING]: 'warning',
  [STATUS.COMPLETED]: 'success',
  [STATUS.FAILED]: 'danger',
  [STATUS.CANCELLED]: 'neutral',
  [STATUS.PROCESSING]: 'info',
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'neutral',
}

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(
  ([value, label]) => ({ value, label }),
)
