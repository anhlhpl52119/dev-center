export const BREAKPOINTS = {
  XXS: 0,
  XS: 767,
  SM: 768,
  MD: 1024,
  LG: 1440,
  XL: 1920
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
