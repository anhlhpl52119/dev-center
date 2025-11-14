<script setup lang="ts">
import type { LNBModel } from '~/components/OldLeftNavBar/types';

// import { getGNBMenusQuery } from '~~/graphql/queries/home-page';

// const { $api } = useNuxtApp();
// const { data: modules, execute } = await useAsyncData('modules', () => $api('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: {
//     query: getGNBMenusQuery,
//     variables: {
//       tags: [
//         'gnb-depth1-ko',
//       ],
//     },
//   },
// }));
const dummyLNB: LNBModel[] = [
  {
    id: 1,
    depth: 0,
    title: 'Home',
    pageId: 101,
    path: '/home',
    href: '/dev',
    locale: 'en',
    isPrivate: false,
    isFolder: false,
    privateNS: null,
    parent: null,
    children: [],
  },
  {
    id: 2,
    depth: 0,
    title: 'Documentation',
    pageId: null,
    path: '/docs',
    href: '/search',
    isFolder: true,
    parent: null,
    children: [
      {
        id: 3,
        depth: 1,
        title: 'Getting Started',
        pageId: 201,
        path: '/docs/getting-started',
        href: '/docs/getting-started',
        isFolder: false,
        parent: 2,
        children: [],
      },
      {
        id: 4,
        depth: 1,
        title: 'Guides',
        pageId: null,
        path: '/docs/guides',
        href: '/docs/guides',
        isFolder: true,
        parent: 2,
        children: [
          {
            id: 5,
            depth: 2,
            title: 'Installation',
            pageId: 301,
            path: '/docs/guides/installation',
            href: '/docs/guides/installation',
            locale: 'en',
            isFolder: false,
            parent: 4,
            children: [],
          },
          {
            id: 6,
            depth: 2,
            title: 'Configuration',
            pageId: 302,
            path: '/docs/guides/configuration',
            href: '/docs/guides/configuration',
            isPrivate: true,
            privateNS: 'internal',
            isFolder: false,
            parent: 4,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    depth: 0,
    title: 'Admin',
    pageId: null,
    path: '/admin',
    href: '/admin',
    isFolder: true,
    isPrivate: true,
    privateNS: 'admin',
    children: [
      {
        id: 8,
        depth: 1,
        title: 'Dashboard',
        pageId: 401,
        path: '/admin/dashboard',
        href: '/admin/dashboard',
        parent: 7,
        children: [],
      },
      {
        id: 9,
        depth: 1,
        title: 'Users',
        pageId: null,
        path: '/admin/users',
        href: '/admin/users',
        parent: 7,
        isFolder: true,
        children: [
          {
            id: 10,
            depth: 2,
            title: 'User List',
            pageId: 402,
            path: '/admin/users/list',
            href: '/admin/users/list',
            parent: 9,
            children: [],
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <div>
    <h1>Content</h1>
    <!-- <button class="bg-abd-active p-2 rounded-2xl" @click="execute()">
      trigger manual
    </button>

    <article>
      <pre>{{ modules }}</pre>
    </article> -->

    <OldLeftNavBar :catalogs="dummyLNB" isShowTocMenuIcon />
  </div>
</template>
