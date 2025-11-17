import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (str: string, options?: any) => {
  return DOMPurify.sanitize(str, options);
};
