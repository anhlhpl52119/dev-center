<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

defineI18nRoute(false);

// Get all SVG files from the assets/svg directory
const glob = import.meta.glob('@/assets/svg/*.svg');

// Extract filenames from the glob keys
const icons = Object.keys(glob)
  .map((path) => {
    // Path examples: /app/assets/svg/name.svg or ../assets/svg/name.svg
    const filename = path.split('/').pop()?.replace('.svg', '') || '';
    return {
      filename,
      path,
      iconName: `svg:${filename}`,
    };
  })
  .filter(i => i.filename);

const { copy, copied, text } = useClipboard();

function handleCopy(t: string) {
  copy(t);
}
</script>

<template>
  <main class="container mx-auto p-24">
    <h1 class="text-25 my-40 text-center font-bold">
      Icon Demo
    </h1>

    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="text-12 px-24 py-12 text-left font-medium tracking-wider text-gray-500 uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              class="text-12 px-24 py-12 text-left font-medium tracking-wider text-gray-500 uppercase"
            >
              Icon
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="icon in icons"
            :key="icon.filename"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
              <div class="flex items-center gap-2">
                <button
                  class="text-14 ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-36 items-center justify-center rounded-md border px-12 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  :title="`Copy ${icon.iconName}`"
                  @click="handleCopy(icon.iconName)"
                >
                  <span
                    v-if="copied && text === icon.iconName"
                    class="text-green-600"
                  >Copied!</span>
                  <span v-else>Copy</span>
                </button>
                <code class="rounded bg-gray-100 px-8 py-4">{{
                  icon.iconName
                }}</code>
              </div>
            </td>
            <td class="text-14 px-24 py-16 whitespace-nowrap text-gray-500">
              <div
                class="flex h-40 w-40 items-center justify-center rounded bg-gray-50"
              >
                <Icon :name="icon.iconName" class="text-24" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
