<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

onMounted(async () => {
  await nextTick()

  logger
    .withTag('page:index')
    .debug('has mounted')
})
</script>

<template>
  <ClientOnly>
    <AppCanvasWrapper width="800" height="450" />
  </ClientOnly>
</template>
