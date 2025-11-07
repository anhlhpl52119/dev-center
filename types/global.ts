export {};

declare global {
  // for `event.target.value`
  interface EventTarget {
    value: string;
  }
}
