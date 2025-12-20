<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue';

const { drawerState, close } = useDrawer();
</script>

<template>
  <DrawerRoot :open="drawerState.isOpen" @update:open="(open) => !open && close()">
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-black/40 z-998" />
      <DrawerContent
        class="fixed inset-y-12 p-12 overflow-hidden rounded-2xl left-12 max-w-400 bg-white z-999 after:hidden"
        data-dismissable-layer=""
        tabindex="-1"
        data-vaul-drawer=""
        data-vaul-drawer-direction="left"
        data-vaul-delayed-snap-points="false"
        data-vaul-snap-points="false"
      >
        <div class="overflow-y-auto h-full">
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
