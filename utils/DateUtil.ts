// import { useDateUtil } from 'seed-utils';
// import type { LocalizationOptions } from 'seed-utils/dist/utils/date-util/types';
import { DATE_FORMAT } from '@/constants/DateConfig';

import { DateUtil, type LocalizationOptions } from './sgvn/date';

/**
 * Check if a date string is a valid date.
 * @param {string} dateString - The date string to be checked.
 * @returns {boolean} - Returns true if the date string is a valid date, otherwise returns false.
 */
export const isDateValid = (dateString: string) : boolean => {
  const parsedDate = new Date(dateString);

  return !isNaN(parsedDate.getTime());
};

/**
 * Format a valid date string using a specified date format.
 * @param {string} dateString - The valid date string to be formatted.
 * @param options
 * @returns {string} - Returns the formatted date string, or an empty string if the input date string is not valid.
 */
export const formatLastUpdateContentPage = (dateString: string, options?: LocalizationOptions) : string => {
  if (isDateValid(dateString)) {
    return DateUtil.getInstance().format(dateString, DATE_FORMAT, { locale: options?.locale, zoneName: options?.zoneName });
  }

  return '';
};
// export const formatLastUpdateContentPage = (dateString: string, options?: LocalizationOptions) : string => {
//   if (isDateValid(dateString)) {
//     return useDateUtil().format(dateString, DATE_FORMAT, { locale: options?.locale, zoneName: options?.zoneName });
//   }

//   return '';
// };
