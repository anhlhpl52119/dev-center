<script setup lang="ts">
const { screenSmallerOrEq } = useBreakpoints();
</script>

<template>
  <header>
    <nav class="mx-auto h-64 max-w-1600 px-16 lg:px-40">
      <div class="relative flex size-full items-center justify-end-safe">
        <!-- Logo -->
        <NuxtLink to="/" class="mr-auto leading-30 whitespace-nowrap">
          <Icon
            name="svg:stove-text-logo"
            class="hidden h-16 w-71 md:inline-block align-[-0.1em]"
          />

          <span class="text-20 font-bold ml-16">
            {{ $t('common.bubbliz_guide') }}
          </span>
        </NuxtLink>

        <!-- right nav -->
        <div class="md:relative ml-8 flex justify-end-safe items-center md:w-880">
          <!-- external link -->
          <NuxtLink
            to="#"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="group clickable hover:bg-abg-dimmed hidden h-32 mr-8 items-center justify-center gap-2 rounded-full py-7 pr-8 pl-12 sm:flex"
          >
            <span class="text-12 font-medium tracking-[-0.0132em]">
              {{ $t('common.go_to_creator_center') }}
            </span>

            <Icon
              name="svg:navigate-out"
              class="group-hover:text-primary m-2 size-12"
            />
          </NuxtLink>

          <!-- search -->
          <SearchControl>
            <template v-if="screenSmallerOrEq.md" #trigger="{ toggle, isShowed }">
              <button
                v-show="!isShowed"
                aria-label="Search page content"
                aria-describedby="Fuzzy search content of specific page"
                class="clickable hover:bg-abg-dimmed inline-flex items-center justify-center rounded-full p-6"
                @click="toggle"
              >
                <Icon
                  name="svg:search"
                  class="m-2 size-16"
                />
              </button>
            </template>
          </SearchControl>
        </div>

        <!-- menu -->
        <UserMenuControl />
      </div>
    </nav>
  </header>
</template>
