<script setup lang="ts">
import { getGNBMenusQuery } from '~~/graphql/queries/home-page';

const { $api } = useNuxtApp();
const { data: modules, execute } = await useAsyncData('modules', () => $api('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: {
    query: getGNBMenusQuery,
    variables: {
      tags: [
        'gnb-depth1-ko',
      ],
    },
  },
}));
</script>

<template>
  <div>
    <h1>Content</h1>
    <button class="bg-abd-active p-2 rounded-2xl" @click="execute()">
      trigger manual
    </button>

    <article>
      <pre>{{ modules }}</pre>
    </article>
  </div>
</template>
