import {
  breakpointsTailwind,
  useBreakpoints as vueUseBreakpoints,
} from '@vueuse/core';

export function useBreakpoints() {
  const bp = vueUseBreakpoints(breakpointsTailwind, {
    // ssrWidth: 123 TODO: define later
  });

  const screenSmallerOrEq = reactive({
    xs: bp.smallerOrEqual('sm'),
    md: bp.smallerOrEqual('md'),
    lg: bp.smallerOrEqual('lg'),
    xl: bp.smallerOrEqual('xl'),
    '2xl': bp.smallerOrEqual('2xl'),
  });

  const screenLargerOrEq = reactive({
    xs: bp.greaterOrEqual('sm'),
    md: bp.greaterOrEqual('md'),
    lg: bp.greaterOrEqual('lg'),
    xl: bp.greaterOrEqual('xl'),
    '2xl': bp.greaterOrEqual('2xl'),
  });

  return {
    screenSmallerOrEq,
    screenLargerOrEq,
  };
}
