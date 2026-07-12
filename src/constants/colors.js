export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    light: '#ecfdf5',
    DEFAULT: '#10b981',
    dark: '#047857',
  },
  warning: {
    light: '#fffbeb',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },
  danger: {
    light: '#fef2f2',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#f0f9ff',
    DEFAULT: '#0ea5e9',
    dark: '#0369a1',
  },
}

export const CHART_COLORS = [
  COLORS.primary[600],
  COLORS.success.DEFAULT,
  COLORS.warning.DEFAULT,
  COLORS.info.DEFAULT,
  COLORS.danger.DEFAULT,
  COLORS.primary[400],
  COLORS.neutral[500],
]

export const STATUS_COLORS = {
  pending: COLORS.warning.DEFAULT,
  completed: COLORS.success.DEFAULT,
  failed: COLORS.danger.DEFAULT,
  cancelled: COLORS.neutral[400],
  processing: COLORS.info.DEFAULT,
  active: COLORS.success.DEFAULT,
  inactive: COLORS.neutral[400],
}
