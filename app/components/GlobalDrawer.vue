<script setup lang="ts">
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from 'vaul-vue';

const { drawerState, close } = useDrawer();
</script>

<template>
  <DrawerRoot
    :open="drawerState.isOpen"
    @update:open="(open) => !open && close()"
  >
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 z-998 bg-black/40" />
      <DrawerContent
        class="fixed inset-y-12 z-999 max-w-400 overflow-hidden rounded-2xl bg-white p-12 after:hidden"
        :class="{
          'left-12': drawerState.position === 'left',
          'right-12': drawerState.position === 'right',
        }"
        data-dismissable-layer=""
        tabindex="-1"
        data-vaul-drawer=""
        :data-vaul-drawer-direction="drawerState.position"
        data-vaul-delayed-snap-points="false"
        data-vaul-snap-points="false"
      >
        <div class="h-full overflow-y-auto">
          <component
            :is="drawerState.component"
            v-if="drawerState.component"
            v-bind="drawerState.props"
            @close="close"
          />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
