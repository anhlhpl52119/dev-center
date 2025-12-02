<template>
  <div
    :id="editorId"
    :class="[
      'contents sdc-content',
      prefix,
      props.class,
      props.theme === 'dark' && `${prefix}-dark`,
      `${prefix}-previewOnly`
    ]"
    :style="props.style"
  >
    <div class="content-heading">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>

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

    <div class="last-updated text-end mt-20">
      <span class="time">{{ t('dev_center.docs.last_updated') }}</span>
      <span class="time">{{ lastUpdate }}</span>
    </div>
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
const { t } = useI18n();

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
<style lang="scss" scoped>
.content-heading {
  color: $vulcanus-text-clr-raised;
  margin-bottom: 4rem;
  margin-top: 4rem;
  word-wrap: break-word;
  & h1 {
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 4.4rem;
    letter-spacing: -0.03rem;
  }

  & p {
    color: $vulcanus-text-clr-dimmed;
    font-size: 1.3rem;
    margin-top: 0.4rem;
    font-weight: 400;
    line-height: 2.2rem;
    padding: 0 0 0.2rem 0;
    letter-spacing: 0.0025rem;
  }
}

@include media-breakpoint-down(md) {
  .content-heading {
    margin-top: 0;
    margin-bottom: 2rem;
    padding-left: 3rem;
  }
}
</style>
