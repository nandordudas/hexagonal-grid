<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const canvasRef = shallowRef<HTMLCanvasElement | null>(null)

defineExpose({
  canvasRef,
})

onMounted(() => {
  logger
    .withTag('component:app-canvas')
    .debug('has mounted')
})
</script>

<template>
  <canvas ref="canvasRef" v-bind="$attrs" />
</template>

<style lang="postcss" scoped>
canvas {
  @apply bg-slate-100 rounded ring-1 ring-slate-300 shadow-lg shadow-slate-300;
  @apply dark:ring-slate-700 dark:bg-slate-800 dark:shadow-slate-700;
}
</style>
