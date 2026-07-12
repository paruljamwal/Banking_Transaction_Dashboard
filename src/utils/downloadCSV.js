/**
 * @param {unknown} value
 * @returns {string}
 */
function escapeCsvValue(value) {
  if (value === null || value === undefined) return ''

  const stringValue = String(value)

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

/**
 * @param {Record<string, unknown>[]} data
 * @param {{ columns?: { key: string, label: string }[] }} [options]
 * @returns {string}
 */
export function buildCsvString(data, options = {}) {
  if (!Array.isArray(data) || data.length === 0) return ''

  const columns =
    options.columns ||
    Object.keys(data[0]).map((key) => ({ key, label: key }))

  const header = columns.map((col) => escapeCsvValue(col.label)).join(',')
  const rows = data.map((row) =>
    columns.map((col) => escapeCsvValue(row[col.key])).join(','),
  )

  return [header, ...rows].join('\n')
}

/**
 * @param {Record<string, unknown>[]} data
 * @param {{ columns?: { key: string, label: string }[], filename?: string }} [options]
 */
export function downloadCSV(data, options = {}) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('downloadCSV requires a non-empty array')
  }

  const csvContent = buildCsvString(data, options)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = options.filename || `export-${Date.now()}.csv`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
