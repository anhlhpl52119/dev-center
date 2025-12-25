<template>
  <div>
    <AppHeader class="bg-abg-base sticky inset-y-0 top-0 z-3 h-64" />

    <div class="min-h-[calc(100vh-6.4rem)]">
      <slot />
    </div>

    <AppFooter class="mt-100 md:mx-0 md:mt-200" />
  </div>
</template>
