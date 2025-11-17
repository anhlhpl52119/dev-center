<template>
  <div
    :id="`${editorId}-preview-wrapper`"
    :key="'content-preview-wrapper'"
    tabindex="0"
    :class="`${prefix}-preview-wrapper`"
    :data-show="props.setting.preview"
    @keyup.esc="isOpenZoomImage && closeFullscreen()"
  >
    <article
      :id="`${editorId}-preview`"
      :class="[
        'sdc-preview',
        `${prefix}-preview`,
        `${previewTheme?.valueOf()}-theme`
      ]"
      v-html="cleanHTML"
    ></article>
    <ZoomImageComponent
      v-if="isOpenZoomImage"
      :imageUrl="currentZoomImage"
      @closeFullscreen="closeFullscreen"
    />
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue';

import ZoomImageComponent from '@/components/detail/ZoomImageComponent.vue';
import useCopyCode from '@/composables/md/useCopyCode';
import useMarkdownIt from '@/composables/md/useMarkdownIt';
import { prefix } from '@/types/md/config';
import type { contentPreviewProps } from '@/types/md/props';
import type { PreviewThemes } from '@/types/md/type';
import { transformZoomableImageHtml, zoomImageHandler } from '@/utils/md/dom';
import { sanitize } from '@/utils/SanitizeHTML';

const props = withDefaults(defineProps<contentPreviewProps>(), {
  setting: () => ({}),
  noMermaid: false,
  noKatex: false,
  formatCopiedText: (text: string) => text,
  noHighlight: false,
  noImgZoomIn: false
});

const currentZoomImage = ref<string>('');
const isOpenZoomImage = ref<boolean>(false);

const editorId = inject('editorId') as string;

const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');
const { html, key } = useMarkdownIt(props);

const cleanHTML = computed(() => {
  return sanitize(transformZoomableImageHtml(html.value));
});

const closeFullscreen = () => {
  currentZoomImage.value = '';
  isOpenZoomImage.value = false;
};

// TODO: enable when finish re-markup preview image component.
// onMounted(async () => {
//   document.addEventListener('click', (e: Event) => zoomImageHandler(e, currentZoomImage, isOpenZoomImage));
// });

// onUnmounted(() => {
//   document.removeEventListener('click', (e: Event) => zoomImageHandler(e, currentZoomImage, isOpenZoomImage));
// });

useCopyCode(props, html, key);
</script>

<style scoped lang="scss">
</style>
