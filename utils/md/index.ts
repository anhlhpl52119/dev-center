/**
 * Add line numbers to code blocks
 *
 * @param code Code html content
 * @returns string
 */
export const generateCodeRowNumber = (code: string) => {
  if (!code) {
    return code;
  }

  const list = code.split('\n');
  // Line number html code splicing list
  const rowNumberList = ['<span rn-wrapper aria-hidden="true">'];
  list.forEach(() => {
    rowNumberList.push('<span></span>');
  });
  rowNumberList.push('</span>');
  return `<span class="code-block">${code}</span>${rowNumberList.join('')}`;
};

/**
 * Get random characters
 *
 * @returns string
 */
export const uuid = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

/**
 * Get the top position of the element relative to the target element
 *Code comes from antd
 *
 * @param element
 * @param container
 * @returns
 */
export const getRelativeTop = (element: HTMLElement, container: HTMLElement): number => {
  // Try to remove potential issues where the element does not exist (https://github.com/imzbf/md-editor-v3/issues/308)
  if (!element || !container) {
    return 0;
  }

  const eleRect = element?.getBoundingClientRect();

  if (container === document.documentElement) {
    return eleRect.top - container.clientTop;
  }

  const conRect = container?.getBoundingClientRect();

  return eleRect.top - conRect.top;
};
