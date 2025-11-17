<template>
  <div class="title">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>

  <div
    :id="editorId"
    :class="[
      'contents sdc-content',
      prefix,
      props.class,
      props.theme === 'dark' && `${prefix}-dark`,
      `${prefix}-previewOnly`
    ]"
    class="md2"
    :style="props.style"
  >
    <ClientOnly>
      <template #fallback>
        <!-- this will be rendered on server side -->
        <div class="text-end versioning" aria-label="Versioning List"></div>
      </template>
    </ClientOnly>

    <MdContentRender
      :modelValue="modelValue"
      :noMermaid="noMermaid"
      :noKatex="noKatex"
      :formatCopiedText="props.formatCopiedText"
      :noHighlight="noHighlight"
      :noImgZoomIn="props.noImgZoomIn"
      :onHtmlChanged="onHtmlChanged"
      :onGetCatalog="onGetCatalog"
    />
  </div>
</template>
<script setup lang="ts">
import { useExpansionPreview, useProvidePreview } from '@composables/composition';
import { RERENDER } from '@constants/md/event-name';
import { onBeforeUnmount } from 'vue';

// import GalleryComponent from '@/components/detail/GalleryComponent.vue';
import MdContentRender from '@/components/md/MdContentRender.vue';
import { prefix } from '@/types/md/config';
import type { mdPreviewProps } from '@/types/md/props';
import type { ExposePreviewParam, HeadList } from '@/types/md/type';
import bus from '@/utils/event-bus';

// const imageList = [
//   'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
//   'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
//   'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
//   'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg'
// ];

const props = withDefaults(defineProps<mdPreviewProps>(), {
  title: '',
  description: '',
  theme: 'light',
  class: '',
  language: 'en-US',
  editorId: 'md-editor-v3',
  showCodeRowNumber: false,
  previewTheme: 'default',
  style: () => ({}),
  noMermaid: false,
  noKatex: false,
  codeTheme: 'atom',
  formatCopiedText: (text: string) => text,
  codeStyleReverse: true,
  codeStyleReverseList: () => ['default', 'mk-cute'],
  noHighlight: false,
  noIconfont: false,
  versioning: () => []
});

const emit = defineEmits<{
  onHtmlChanged: [html: any] // named tuple syntax
  onGetCatalog: [list: HeadList[]]
  changeVersioning: [versionId: string]
}>();

const {
  editorId,
  noKatex,
  noMermaid,
  noHighlight
} = props;

useProvidePreview(props);

// Insert extended external link
useExpansionPreview(props);

const exposeParam: ExposePreviewParam = {
  rerender() {
    bus.emit(editorId, RERENDER);
  }
};

defineExpose(exposeParam);

// Clear all event listeners before uninstalling the component
onBeforeUnmount(() => {
  bus.clear(editorId);
});

const onHtmlChanged = (html: string) => {
  if (props.onHtmlChanged) {
    props.onHtmlChanged(html);
  } else {
    emit('onHtmlChanged', html);
  }
};

const onGetCatalog = (list: HeadList[]) => {
  if (props.onGetCatalog) {
    props.onGetCatalog(list);
  } else {
    emit('onGetCatalog', list);
  }
};

</script>
<style lang="css" scoped>
.title {
  margin-bottom: 4rem;
  margin-top: 4rem;
}

.md2 {
  box-shadow: 0 4px 16px 0 hsla(228, 23%, 25%, 0.1);
  padding: 3rem !important;
  border-radius: 3.2rem;
  margin-top: 4rem !important;
}
</style>
