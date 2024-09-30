interface CanvasContext {
  offscreenCanvas: OffscreenCanvas
  canvasRef: HTMLCanvasElement
}

type CanvasHandler = (offscreenCanvas: OffscreenCanvas) => void

const debug = logger.withTag('composable:use-canvas').debug

export function useCanvas() {
  debug('using canvas...')

  const canvasRef = shallowRef<CanvasContext | null>(null)

  const watchCanvas = (callback: CanvasHandler) => {
    const stopWatch = watch(
      () => canvasRef.value?.canvasRef,
      (canvasEl) => {
        if (!canvasEl)
          return

        callback(canvasEl.transferControlToOffscreen())
        stop()
      },
      { immediate: true, flush: 'post' },
    )

    function stop() {
      debug('stopping canvas watch...')
      stopWatch()
    }

    onScopeDispose(stop)
  }

  return {
    canvasRef,
    watchCanvas,
  }
}
