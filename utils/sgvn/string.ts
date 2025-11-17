export class StringUtil {
  // eslint-disable-next-line no-use-before-define
  private static instance: StringUtil;

  private constructor() {
    if (StringUtil.instance) {
      return StringUtil.instance;
    }
    StringUtil.instance = this;
  }

  static getInstance(): StringUtil {
    return new StringUtil();
  }

  /*
  * Returns whether the string entered is empty string.
  *
  * @param text
  */
  public isEmpty(text: string): boolean {
    return !text.trim();
  }
}
