<script lang="ts" setup>
const { content, title, updatedAt } = useRoutesContent();

const heading = computed(() => title.value || '');
const description = computed(() => '');
const lastUpdatedAt = computed(() => updatedAt.value);
</script>

<template>
  <article itemscope itemtype="http://schema.org/Article">
    <header>
      <h1 itemprop="headline" class="text-heading mb-1 font-bold">
        {{ heading }}
      </h1>

      <p
        v-if="description"
        itemprop="description"
        class="text-sx text-tcl-dimmed"
      >
        {{ description }}
      </p>
    </header>

    <MarkdownRenderer
      :content="content"
      itemprop="articleBody"
      class="bg-abg-base mt-10 min-h-40 w-179 max-w-179 rounded-4xl p-7.5 shadow-sm overflow-x-auto"
    />

    <p
      v-if="lastUpdatedAt"
      itemprop="lastUpdatedAt"
      class="text-tcl-dimmed mt-5 text-right text-xs"
    >
      {{ $t('common.last_update_at', { at: lastUpdatedAt }) }}
    </p>
  </article>
</template>
