import type { Component, ShallowRef } from 'vue';

interface DrawerState {
  isOpen: boolean;
  component: ShallowRef<Component> | null;
  props: Record<string, any>;
  position: 'left' | 'right';
}

const drawerState = ref<DrawerState>({
  isOpen: false,
  component: null,
  props: {},
  position: 'left',
});

export function useDrawer() {
  const open = (component: ShallowRef<Component>, props: Record<string, any> = {}, position: 'left' | 'right' = 'left') => {
    drawerState.value = {
      isOpen: true,
      component: shallowRef(component),
      props,
      position,
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
