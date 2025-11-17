import type { BreadcrumbModel } from '@/types/pages/DocModel';

export const capitalizeFirstLetter = (inputString: string): string => {
  if (inputString.length === 0) {
    return '';
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

export const createHrefLNB = (path: string): string => {
  const docsPrefix = '/docs/';
  const commonSearchPath = 'common/search';

  return path === commonSearchPath ? `/${commonSearchPath}` : `${docsPrefix}${path}`;
};

export const highlightKeyword = (keyword: string, content: any): string => {
  if (keyword && content && typeof content === 'string') {
    const regex = new RegExp(keyword, 'gi');
    return content.replace(regex, (match: string) => `<strong class="text-blue">${match}</strong>`);
  }
  return content;
};

/**
 *
 * Convert relative image source to absolute
 *
 * @param {string} htmlString - The string img.
 * @param {string} apiBaseUrl - The base URL for API requests.
 * @returns {string} - The modified HTML string.
 */
export const replaceImageSrcMarkdown = (htmlString: string, apiBaseUrl: string): string => {
  return htmlString.replace(
    /<img\b((?:(?!src=)[\s\S])*?)\ssrc=(['"])\/_assets([^'"\s]+)(['"])/gi,
    (_match: string, otherAttributes: string, p1: string, p2: string, p3: string): string => {
      // Preserve other attributes and just update the src attribute
      const updatedAttributes = otherAttributes.trim() ? ` ${otherAttributes}` : '';
      return `<img${updatedAttributes} src=${p1}${apiBaseUrl}/_assets${p2}${p3}`;
    }
  );
};

/**
 * Processes Markdown text before rendering
 * Remove new line in pre, div class="mermaid", table
 * Convert relative image source to absolute
 *
 * @param {string} mdText - The input Markdown text.
 * @param {string} apiBaseUrl - The base URL for API requests.
 * @returns {string} - The modified HTML string.
 */
export const processMdTextBeforeRender = (mdText: string, apiBaseUrl: string): string => {
  const modifiedHtmlString = mdText.replace(/<(pre|div class="mermaid"|table)([\s\S]*?)<\/(pre|div|table)>/g, (match: string, tag: string, content: string) => {
    const cleanedContent = content.replace(/^\s*[\r\n]/gm, '').replace(/[\r\n]\s*$/gm, '');

    if (tag === 'table') {
      return `<div class="table-container">${match}</div>`;
    }

    return `<${tag}${cleanedContent}</${tag}>`;
  });

  const modifiedDenseText = modifiedHtmlString.replace(/\n{0,2}\{\.dense}/g, '\n\n{.dense}');

  return replaceImageSrcMarkdown(modifiedDenseText, apiBaseUrl);
};

// export const getBreadcrumbsDoc = (path: string, currentTitle: string): BreadcrumbModel[] => {
//   // Remove "/" at the beginning and end of the path
//   const trimmedPath = path.replace(/^\/|\/$/g, '');
//   const splitPath = trimmedPath.split('/');
//   const breadcrumb: BreadcrumbModel[] = [];
//   const sizeBreadcrumbsNotLast = splitPath.length - 1;

//   for (let i = 0; i < sizeBreadcrumbsNotLast; i++) {
//     breadcrumb.push({
//       id: i,
//       label: capitalizeFirstLetter(splitPath[i]),
//       href: '/' + splitPath.slice(0, i + 1).join('/')
//     });
//   }

//   breadcrumb.push({
//     id: sizeBreadcrumbsNotLast,
//     label: capitalizeFirstLetter(currentTitle),
//     href: '/' + path // or specify the href for the currentTitle if needed
//   });

//   return breadcrumb;
// };

/**
 * Check valid url image
 *
 * @param {string} url - The url string.
 * @returns {boolean} - Is url valid or invalid
 */
export const isImageUrl = (url: string): boolean => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|ico|webp|tiff)$/;
  return imageExtensions.test(url);
};

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} s - The string to slugify.
 * @returns {string} The slugify string.
 *
 * @example
 * const slug = slugify('Hello World!');
 * slug Output: 'hello-world'
 */
export const slugify = (s: string) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
