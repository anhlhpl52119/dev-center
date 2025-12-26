<script lang="ts" setup>
function openLnbDrawer() {}
</script>

<template>
  <div>
    <div class="flex h-full items-center justify-between px-16">
      <button
        class="p-8"
        aria-label="Navigation bar"
        aria-describedby="List of navigation page tree"
        aria-pressed="false"
        @click="openLnbDrawer"
      >
        <Icon name="svg:menu-mobile" class="text-quiet size-20 align-middle" />
      </button>

      <button
        class="p-8"
        aria-label="Navigation bar"
        aria-describedby="List of navigation page tree"
        aria-pressed="false"
        @click="openLnbDrawer"
      >
        <Icon
          name="svg:document-outline"
          class="text-quiet size-20 align-middle"
        />
      </button>
    </div>
  </div>
</template>
