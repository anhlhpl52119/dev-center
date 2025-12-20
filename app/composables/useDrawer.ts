import type { Component } from 'vue';

interface DrawerState {
  isOpen: boolean;
  component: Component | null;
  props: Record<string, any>;
}

const drawerState = ref<DrawerState>({
  isOpen: false,
  component: null,
  props: {},
});

export function useDrawer() {
  const open = (component: Component, props: Record<string, any> = {}) => {
    drawerState.value = {
      isOpen: true,
      component,
      props,
    };
  };

  const close = () => {
    drawerState.value.isOpen = false;
  };

  return {
    drawerState: readonly(drawerState),
    open,
    close,
  };
}
