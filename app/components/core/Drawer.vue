<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue';
</script>

<template>
  <DrawerRoot>
    <DrawerTrigger asChild>
      <button>Open Drawer</button>
    </DrawerTrigger>

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
        aria-labelledby="reka-dialog-title-v-0-1-0-1-16-0-0-1"
        data-slot="content"
      >
        <div class="overflow-y-auto h-full">
          <p>
            Brim
            <br>
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quidem ut quo doloremque
            deleniti praesentium voluptate adipisci sit eius facere rem facilis esse tenetur, eaque quia fugit tempora! Nemo, eos quaerat.Drawer content
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quidem ut quo doloremque
            deleniti praesentium voluptate adipisci sit eius facere rem facilis esse tenetur, eaque quia fugit tempora! Nemo, eos quaerat.Drawer content
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quidem ut quo doloremque
            deleniti praesentium voluptate adipisci sit eius facere rem facilis esse tenetur, eaque quia fugit tempora! Nemo, eos quaerat.Drawer content
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quidem ut quo doloremque
            deleniti praesentium voluptate adipisci sit eius facere rem facilis esse tenetur, eaque quia fugit tempora! Nemo, eos quaerat.Drawer content
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quidem ut quo doloremque
            deleniti praesentium voluptate adipisci sit eius facere rem facilis esse tenetur, eaque quia fugit tempora! Nemo, eos quaerat.Drawer content
          </p>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
