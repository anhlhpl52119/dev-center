export function slugify(s: string) {
  return encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
}

export function isNull(value: any): value is null {
  return value === null;
}

/** check if value is undefined */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

/** null or undefined */
export function isNullish(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
