import type { Component, ComponentOptions, VNodeProps } from 'vue';

export {};

declare global {
  export type ComponentProps<C extends Component> = C extends new (
    ...args: any
  ) => any
    ? Omit<InstanceType<C>['$props'], keyof VNodeProps>
    : never;

  export type ComponentEmits<
    T extends ComponentOptions<any> & Record<any, any>,
  > = T['emits'];
}
