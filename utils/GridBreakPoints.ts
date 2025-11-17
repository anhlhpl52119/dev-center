export const GridBreakpoints = {
  xxs: 0,
  xs: 767,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920
} as const;

export type BreakpointKeys = keyof typeof GridBreakpoints;

export const mediaBreakpointDown = (size: BreakpointKeys) : boolean => {
  return process.client ? window.innerWidth < GridBreakpoints[size] : false;
};

export const mediaBreakpointUp = (size: BreakpointKeys) : boolean => {
  return process.client ? window.innerWidth >= GridBreakpoints[size] : false;
};

export const mediaBreakpointBetween = (lower: BreakpointKeys, upper: BreakpointKeys) : boolean => {
  return process.client ? window.innerWidth >= GridBreakpoints[lower] && window.innerWidth <= GridBreakpoints[upper] : false;
};
