<template>
  <AppHeader class="h-64 bg-abg-base sticky inset-y-0 top-0 z-3" />

  <div class="min-h-[calc(100vh-6.4rem)]">
    <slot />
  </div>

  <AppFooter />
</template>
