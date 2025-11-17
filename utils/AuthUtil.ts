// import { NoLoginRequiredPages } from '@/constants/Common';

const isEmptyObject = (obj: object = {}) => {
  for (const prop in obj) {
    if (Object.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};
const queryString = (obj: any) => {
  if (typeof obj === 'string') {
    return '';
  }
  return Object.keys(obj).map(
    (k: string) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  ).join('&');
};

const isCP = (loginParams: string): boolean => {
  if (loginParams) {
    return loginParams.includes('inflow_path=CP_PAGE');
  }
  return false;
};

interface ParamsLoginModel {
  /**
   * The redirect url parameter
   */
  redirect_url?: string;
  /**
   * The inflow path parameter
   */
  inflow_path?: string;
  /**
   * The game number parameter
   */
  game_no?: string;
}

export const createAuthLink = (URL: string, params: ParamsLoginModel, redirectCurrentPage: boolean = true) => {
  const copyParams = !isEmptyObject(params) ? structuredClone(params) : '';
  let currentUrl = `redirect_url=${encodeURIComponent(window.location.href)}`;
  let redirectURL = redirectCurrentPage ? currentUrl : '';
  if (copyParams && copyParams.redirect_url) {
    currentUrl = redirectURL = `redirect_url=${params.redirect_url}`;
    delete copyParams.redirect_url;
  }
  const paramToQuery = !isEmptyObject(params) ? `${queryString(copyParams)}` : '';
  redirectURL = `${redirectURL}&${paramToQuery}`;
  if (isCP(paramToQuery)) {
    redirectURL = `${currentUrl}&${paramToQuery}`;
  }
  return `${URL}${redirectURL}`;
};

// export const isPublicRouter = (fullUrl: string, pages: string[] = NoLoginRequiredPages): boolean => {
//   return pages.some((page: string) => {
//     const regex = new RegExp(`^(/[a-z]{2}(-[a-z]{2})?)?${page}(/.*)?$`, 'i');
//     return regex.test(fullUrl);
//   });
// };

export const isLogin = () => {
  const {
    authService: { isAuthentication }
  } = useSeedCore();
  return isAuthentication();
};

export const logout = () => {
  const {
    authService: { logout: scLogout }
  } = useSeedCore();
  scLogout('');
};
