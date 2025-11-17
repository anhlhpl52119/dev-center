<script lang="ts" setup>
definePageMeta({ name: 'home' });
const localePath = useLocalePath();
navigateTo(localePath('/web/etc/Generator'), { replace: true });
</script>
