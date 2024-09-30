<script lang="ts">
import Worker from '~/lib/workers/hexagonal-grid?worker'

interface WorkerData {
  init: {
    offscreenCanvas: OffscreenCanvas
    sharedBuffer: SharedArrayBuffer
  }
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const { canvasRef, watchCanvas } = useCanvas()
const { post } = useWorker<WorkerData>(Worker, { name: 'HexagonalGrid' })
const { sharedBuffer, onMouseEvent } = useSharedData()

watchCanvas((offscreenCanvas) => {
  post({
    type: 'init',
    data: { offscreenCanvas, sharedBuffer },
  }, { transfer: [offscreenCanvas] })

  useEventListener(canvasRef.value?.canvasRef, ['mousemove'], onMouseEvent)
})

onMounted(() => {
  logger
    .withTag('component:app-canvas-wrapper')
    .debug('has mounted')
})
</script>

<template>
  <div class="grid place-items-center h-screen">
    <AppCanvas ref="canvasRef" v-bind="$attrs" />
  </div>
</template>
