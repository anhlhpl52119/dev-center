/**
 *  Function to check whether the current environment is mobile sdk or not
 */
export const isMobileSdk = (): boolean => {
  return typeof window !== 'undefined' && window
    ? window._StoveJSBridge || (window.webkit && window.webkit?.messageHandlers?.StoveJS)
    : undefined;
};
