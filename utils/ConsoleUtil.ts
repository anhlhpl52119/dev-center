export const errorLog = (message: string, error?: any) => {
  console && console.error && console.error(message, error || '');
};
