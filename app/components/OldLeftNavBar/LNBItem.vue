<script setup lang="ts">
import type { LNBModel } from './types';
import { isCurrentNavItemOrDirectChild } from '@/utils/lnb';

interface NavLinkProps {
  navItem: LNBModel;
}

const props = defineProps<NavLinkProps>();
const route = useRoute();
const localePath = useLocalePath();
const currentUrl = ref<string>(route.path.toString());

const isFolderDiv = computed(() => {
  return props.navItem.isFolder === true && props.navItem.pageId === null;
});

function navClick(linkClicked: string) {
  const links = document.querySelectorAll('.js-lnb .sdc-nav-title');
  links.forEach((link: Element) => {
    const href = link.getAttribute('data-href') || '';
    if (href === linkClicked) {
      link.classList.toggle('show');
    }
    else if (isParentLink(href, linkClicked)) {
      link.classList.add('show');
    }
    else {
      link.classList.remove('show');
    }
  });
}

function isParentLink(potentialParent: string, potentialChild: string) {
  return potentialChild.startsWith(potentialParent);
}
// const isCurrentNavItemOrDirectChild = (pageTreeModel: LNBModel) => {
//   const href = pageTreeModel.href;
//   const decodedCurrentUrl = removeLocalePrefix(decodeURIComponent(currentUrl.value));

//   return pageTreeModel.children?.length && (decodedCurrentUrl === href || (decodedCurrentUrl !== href && decodedCurrentUrl.startsWith(href)));
// };

// onMounted(() => {
//   const activePath = removeLocalePrefix(currentUrl.value);
//   navClick(activePath);
// });
</script>

<template>
  <li class="sdc-nav-item">
    <div
      v-if="isFolderDiv"
      class="sdc-nav-title sdc-nav-depth"
      :class="[
        `sdc-nav-depth-${navItem.depth}`,
        { show: isCurrentNavItemOrDirectChild(navItem, currentUrl) },
      ]"
      :data-href="navItem.href"
      role="button"
      @click.stop="navClick(navItem.href)"
    >
      <span
        class="sdc-nav-text"
        :class="[
          `sdc-nav-text-depth-${navItem.depth}`,
          navItem.depth == 2 ? 'text-truncate-1' : 'text-truncate-3',
        ]"
      >{{ navItem?.title }}</span>
      <i
        v-if="navItem.children?.length"
        class="ic-v2-control-select-arrow-down-fill sdc-nav-ic-collapse"
      />
    </div>
    <NuxtLink
      v-else
      :to="localePath(navItem.href)"
      exactActiveClass="sdc-nav-active"
      class="sdc-nav-title sdc-nav-depth sdc-nav-link"
      :class="[
        `sdc-nav-depth-${navItem.depth}`,
        { show: isCurrentNavItemOrDirectChild(navItem, currentUrl) },
      ]"
      :data-href="navItem.href"
      @click.stop="navClick(navItem.href)"
    >
      <span
        class="sdc-nav-text"
        :class="[
          navItem.depth == 2 ? 'text-truncate-1' : 'text-truncate-3',
        ]"
      >{{ navItem?.title }}</span>
      <i
        v-if="navItem.children?.length"
        class="ic-v2-control-select-arrow-down-fill sdc-nav-ic-collapse"
      />
    </NuxtLink>

    <ul v-if="navItem.children && navItem.children.length" class="sdc-nav-sublist">
      <TheLeftNavItem
        v-for="item in navItem.children"
        :key="`${navItem.id}-link-${item.depth}-${item.id}`"
        :navItem="item"
      />
    </ul>
  </li>
</template>
