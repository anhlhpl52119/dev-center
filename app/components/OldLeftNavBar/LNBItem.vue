<script setup lang="ts">
import type { LNBModel } from './types';

interface NavLinkProps {
  navItem: LNBModel;
}

const props = defineProps<NavLinkProps>();

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
</script>

<template>
  <li class="pl-4 rounded-full leading-6 font-bold">
    <!-- single route -->
    <NuxtLinkLocale
      v-if="!isFolderDiv"
      :to="navItem.href"
      exactActiveClass="bg-abg-active text-tcl-primary"
      class="rounded-full block py-2 pr-3 pl-4 leading-6 font-medium hover:bg-abg-active hover:text-tcl-primary"
      :data-href="navItem.href"
      @click.stop="navClick(navItem.href)"
    >
      <span>{{ navItem?.title }}</span>
      <Icon
        v-if="navItem.children?.length"
        name="svg:single-arrow-down"
        class="ml-auto w-2.5"
      />
    </NuxtLinkLocale>

    <!-- nested routes -->
    <div
      v-else
      class="cursor-pointer text-md flex items-center rounded-full py-2 pr-3 pl-4 hover:bg-abg-active hover:text-tcl-primary"
      :data-href="navItem.href"
      role="button"
      @click.stop="navClick(navItem.href)"
    >
      <span>{{ navItem?.title }}</span>
      <Icon
        v-if="navItem.children?.length"
        name="svg:single-arrow-down"
        class="ml-auto w-2.5"
      />
    </div>
    <ul v-if="navItem.children && navItem.children.length">
      <LNBItem
        v-for="item in navItem.children"
        :key="`${navItem.id}-link-${item.depth}-${item.id}`"
        :navItem="item"
      />
    </ul>
  </li>
</template>
