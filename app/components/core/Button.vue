<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();
const slots = useSlots();

const isActive = ref(false);

const hasDefaultSlot = computed(() => !!slots.default);
const hasIconSlot = computed(() => !!slots.icon);

function handleClick(event: MouseEvent) {
  isActive.value = !isActive.value;
  emit('click', event);
}
</script>

<template>
  <button
    class="btn"
    type="button"
    :class="[{ 'btn--active': isActive, 'btn--icon-only': !hasDefaultSlot }]"
    :aria-pressed="isActive"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      v-if="hasIconSlot"
      class="btn__icon"
      role="img"
    >
      <slot name="icon" />
    </span>

    <span v-if="hasDefaultSlot" class="btn__text">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="css">
.btn {
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5714285714285714;

  font-size: 24px;
  padding: 4px 15px;
  border-radius: 6px;

  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);

  .btn__icon {
    display: inline-block;
    align-items: center;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: 0.05em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
