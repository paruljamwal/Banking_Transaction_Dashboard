export const UI_COLORS = {
  primary: {
    bg: 'bg-primary-600',
    bgHover: 'hover:bg-primary-700',
    text: 'text-primary-600',
    ring: 'focus-visible:ring-primary-500/30',
    border: 'border-primary-600',
    light: 'bg-primary-50 text-primary-700',
  },
  secondary: {
    bg: 'bg-surface-elevated',
    bgHover: 'hover:bg-bg',
    text: 'text-text',
    ring: 'focus-visible:ring-border',
    border: 'border-border',
    light: 'bg-bg text-text-secondary',
  },
  success: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-700',
    light: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  warning: {
    bg: 'bg-amber-500',
    text: 'text-amber-700',
    light: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  danger: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    text: 'text-red-700',
    light: 'bg-red-50 text-red-700 border-red-200',
    ring: 'focus-visible:ring-red-500/30',
  },
  info: {
    bg: 'bg-sky-600',
    text: 'text-sky-700',
    light: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  neutral: {
    bg: 'bg-bg',
    text: 'text-text-secondary',
    light: 'bg-bg text-muted border-border',
  },
}

export const UI_SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
}

export const UI_TYPOGRAPHY = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export const UI_SIZES = {
  input: {
    sm: 'h-8 text-xs px-3',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  },
  button: {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  },
  icon: {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  },
  loader: {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  },
  badge: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  },
}

export const BUTTON_VARIANTS = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500/30',
  secondary:
    'bg-surface border border-border text-text hover:bg-bg focus-visible:ring-border',
  outline:
    'border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500/30',
  ghost:
    'bg-transparent text-text-secondary hover:bg-bg hover:text-text focus-visible:ring-border',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/30',
}

export const BADGE_VARIANTS = {
  default: 'bg-bg text-text-secondary border-border',
  primary: 'bg-primary-50 text-primary-700 border-primary-100',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
}

export const MODAL_SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)]',
}
