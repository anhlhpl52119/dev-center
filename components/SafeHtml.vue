<template>
  <!-- eslint-disable-next-line vue/no-v-html, vue/no-v-text-v-html-on-component -->
  <component :is="tag" v-html="cleanHtml" />
</template>

<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify';
import { computed } from 'vue';

/**
 * This component is only usable for CSR (Client-Side Rendering), SSR cannot render it.
 */
const props = withDefaults(defineProps<{
  html: string;
  tag?: string;
  options?: any; // https://www.npmjs.com/package/dompurify#general-settings
}>(), {
  tag: 'span',
  options: () => ({})
});

const cleanHtml = computed(() => DOMPurify.sanitize(props.html, props.options));
</script>
