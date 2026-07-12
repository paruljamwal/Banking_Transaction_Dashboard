const DEFAULT_OPTIONS = {
  locale: 'en-IN',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

/**
 * @param {number} amount
 * @param {Intl.NumberFormatOptions & { locale?: string }} [options]
 * @returns {string}
 */
export function formatCurrency(amount, options = {}) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return '—'
  }

  const { locale, currency, ...formatOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: formatOptions.minimumFractionDigits,
    maximumFractionDigits: formatOptions.maximumFractionDigits,
  }).format(Number(amount))
}

/**
 * @param {number} amount
 * @param {Intl.NumberFormatOptions & { locale?: string }} [options]
 * @returns {string}
 */
export function formatCompactCurrency(amount, options = {}) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return '—'
  }

  const { locale, currency } = { ...DEFAULT_OPTIONS, ...options }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(amount))
}
