<script lang="ts" setup>
definePageMeta({ name: 'home' });
const localePath = useLocalePath();
const { locale } = useI18n();
if (locale.value === 'ko') {
  navigateTo(localePath('/web/etc/Generator'), { replace: true });
}
else {
  navigateTo(localePath('/web/auth/gnb/GNB-디자인'), { replace: true });
}
</script>
