export const BUTTON_VARIANTS = {
  solid: 'solid',
  outline: 'outline',
  soft: 'soft',
  ghost: 'ghost',
  link: 'link'
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

export const BUTTON_SIZES = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl'
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;

export interface Button {
  type?: string;
  block?: boolean;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  padded?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: string;
  loadingIcon?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  trailing?: boolean;
  leading?: boolean;
  to?: string | object;
  target?: string;
  square?: boolean;
  truncate?: boolean;
}

export const Pagination = {
  wrapper: 'flex items-center -space-x-px',
  base: '',
  rounded: 'first:rounded-s-md last:rounded-e-md',
  default: {
    size: 'sm',
    activeButton: {
      color: 'primary'
    },
    inactiveButton: {
      color: 'white'
    },
    prevButton: {
      color: 'white',
      class: 'rtl:[&_span:first-child]:rotate-180',
      icon: 'i-heroicons-chevron-left-20-solid'
    },
    nextButton: {
      color: 'white',
      class: 'rtl:[&_span:last-child]:rotate-180',
      icon: 'i-heroicons-chevron-right-20-solid '
    }
  }
};

export interface Image {
  platform: string;
  alt: string;
  src: string;
}
