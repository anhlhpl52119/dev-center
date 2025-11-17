import type { ErrAPIOptions } from '@/types/api';

export const GraphQLErrorCode : Readonly<Record<string, ErrAPIOptions>> = {
  UNEXPECTED_LOGIN: {
    code: 1001,
    msg: 'wikijs-returncode.E1001'
  },
  INVALID_ACCOUNT: {
    code: 1002,
    msg: 'wikijs-returncode.E1002'
  },
  INVALID_AUTHENTICATION_PROVIDER: {
    code: 1003,
    msg: 'wikijs-returncode.E1003'
  },
  ACCOUNT_EXISTS: {
    code: 1004,
    msg: 'wikijs-returncode.E1004'
  },
  INCORRECT_TFA_SECURITY_CODE: {
    code: 1005,
    msg: 'wikijs-returncode.E1005'
  },
  INVALID_TFA_SECURITY_CODE_OR_LOGIN_TOKEN: {
    code: 1006,
    msg: 'wikijs-returncode.E1006'
  },
  INVALID_BRUTE_FORCE_INSTANCE: {
    code: 1007,
    msg: 'wikijs-returncode.E1007'
  },
  TOO_MANY_ATTEMPTS: {
    code: 1008,
    msg: 'wikijs-returncode.E1008'
  },
  REGISTRATION_IS_DISABLED: {
    code: 1010,
    msg: 'wikijs-returncode.E1010'
  },
  UNAUTHORIZED_TO_REGISTER: {
    code: 1011,
    msg: 'wikijs-returncode.E1011'
  },
  ACCOUNT__DISABLED: {
    code: 1013,
    msg: 'wikijs-returncode.E1013'
  },
  VERIFY_ACCOUNT_BEFORE_LOGIN: {
    code: 1014,
    msg: 'wikijs-returncode.E1014'
  },
  INVALID_TOKEN: {
    code: 1015,
    msg: 'wikijs-returncode.E1015'
  },
  AUTHENTICATED_TO_ACCESS_RESOURCE: {
    code: 1019,
    msg: 'wikijs-returncode.E1019'
  },
  PASSWORD_INCORRECT: {
    code: 1020,
    msg: 'wikijs-returncode.E1020'
  },
  UNEXPECTED_DURING_ASSET_OPERATION: {
    code: 2001,
    msg: 'wikijs-returncode.E2001'
  },
  FOLDER_EXISTS: {
    code: 2002,
    msg: 'wikijs-returncode.E2002'
  },
  UNAUTHORIZED_TO_DELETE_ASSET: {
    code: 2003,
    msg: 'wikijs-returncode.E2003'
  },
  ASSET_DOES_NOT_EXIST: {
    code: 2004,
    msg: 'wikijs-returncode.E2004'
  },
  ASSET_EXISTS: {
    code: 2005,
    msg: 'wikijs-returncode.E2005'
  },
  UNAUTHORIZED_RENAME_ASSET: {
    code: 2006,
    msg: 'wikijs-returncode.E2006'
  },
  NEW_ASSET_FILENAME_INVALID: {
    code: 2007,
    msg: 'wikijs-returncode.E2007'
  },
  FILE_EXTENSION_CANNOT_CHANGED: {
    code: 2008,
    msg: 'wikijs-returncode.E2008'
  },
  UNAUTHORIZED_RENAME_REQUESTED_NAME: {
    code: 2009,
    msg: 'wikijs-returncode.E2009'
  },
  PAGE_NOT_FOUND: {
    code: 6003,
    msg: 'wikijs-returncode.E6003'
  },
  PAGE_PATH_ILLEGAL_CHARACTERS: {
    code: 6005,
    msg: 'wikijs-returncode.E6005'
  },
  UNAUTHORIZED_CREATE_PAGE: {
    code: 6008,
    msg: 'wikijs-returncode.E6008'
  },
  UNAUTHORIZED_VIEW_HISTORY_PAGE: {
    code: 6012,
    msg: 'wikijs-returncode.E6012'
  },
  UNAUTHORIZED_VIEW_PAGE: {
    code: 6013,
    msg: 'wikijs-returncode.E6013'
  },
  MISSING_PERMISSIONS: {
    code: 6014,
    msg: 'wikijs-returncode.E6013'
  },
  AUTH_INVALID_TOKEN: {
    code: 6015,
    msg: 'wikijs-returncode.E6013'
  },
  REQUIRED_AUTHENTICATION: {
    code: 6018,
    msg: 'wikijs-returncode.E6018'
  }
};
