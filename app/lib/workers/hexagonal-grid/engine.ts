import type { Renderer } from './renderer'

interface EngineOptions {
  renderer: Renderer
}

interface RunCallbackContext {
  deltaTime: number
  engine: Engine
}

export type RunCallback = (context: RunCallbackContext) => void

/**
 * @throws {TypeError} if the `renderer` option is not provided.
 */
export class Engine {
  readonly #renderer: Renderer
  #lastFrameTime: number
  #running: boolean = false

  get renderer() {
    return this.#renderer
  }

  constructor(options: EngineOptions) {
    assert(options.renderer !== undefined, 'Renderer is required', TypeError)

    this.#renderer = options.renderer
    this.#lastFrameTime = performance.now()
  }

  render(): void {
    this.#renderer.clearCanvas()
  }

  run(callback: RunCallback): void {
    this.#running = true

    const step = (timestamp: DOMHighResTimeStamp) => {
      if (!this.#running)
        return

      this.#lastFrameTime = timestamp

      this.render()
      callback({
        deltaTime: (timestamp - this.#lastFrameTime) / 1_000,
        engine: this,
      })
      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  stop(): void {
    this.#running = false
  }
}
