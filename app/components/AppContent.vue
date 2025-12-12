<script lang="ts" setup>
defineProps<{
  content: string;
  updatedAt: string;
  description: string;
  heading: string;
}>();
</script>

<template>
  <article itemscope itemtype="http://schema.org/Article">
    <header>
      <h1 itemprop="headline" class="text-32 mb-4 leading-44 font-bold">
        {{ heading }}
      </h1>
      <p
        v-if="description"
        itemprop="description"
        class="text-13 text-quiet leading-22 tracking-[-0.0025rem]"
      >
        {{ description }}
      </p>
    </header>

    <MarkdownRenderer
      :content="content"
      itemprop="articleBody"
      class="bg-abg-base bd-radius-32 mt-40 min-h-2000 overflow-x-auto p-30 shadow-sm"
    />

    <p
      v-if="updatedAt"
      itemprop="lastUpdatedAt"
      class="text-quiet text-13 mt-20 text-right"
    >
      {{ $t('common.last_update_at', { at: updatedAt }) }}
    </p>
  </article>
</template>
