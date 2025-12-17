<script lang="ts" setup>
definePageMeta({ name: 'home' });
const localePath = useLocalePath();
const { locale } = useI18n();

// TODO: retrieve first content and navigate to first
if (locale.value === 'ko') {
  navigateTo(localePath('/web/etc/Generator'), { replace: true, redirectCode: 307 });
}
else {
  navigateTo(localePath('/web/auth/gnb/GNB-디자인'), { replace: true, redirectCode: 307 });
}
</script>
