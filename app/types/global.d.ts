export { };

declare global {
  // for `event.target.value`
  interface EventTarget {
    value: string;
  }

  type ValueOf<T> = T[keyof T];

  type StringUnions<T> = T | (string & {});

  type NumberUnions<T> = T | (number & {});

}
