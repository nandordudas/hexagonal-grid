interface RendererOptions {
  context: OffscreenCanvasRenderingContext2D
}

export interface Drawable {
  draw: (context: OffscreenCanvasRenderingContext2D) => void
}

/**
 * @throws {TypeError} if the `context` option is not provided.
 */
export class Renderer {
  readonly #context: OffscreenCanvasRenderingContext2D

  get context() {
    return this.#context
  }

  get width() {
    return this.#context.canvas.width
  }

  get height() {
    return this.#context.canvas.height
  }

  constructor(options: RendererOptions) {
    assert(options.context !== undefined, 'Context is required', TypeError)

    this.#context = options.context
  }

  clearCanvas(): void {
    this.#context.clearRect(0, 0, this.width, this.height)
  }

  render(drawable: Drawable): void {
    this.#context.save()
    drawable.draw(this.#context)
    this.#context.restore()
  }

  renderAll(drawables: Drawable[]): void {
    for (const drawable of drawables)
      this.render(drawable)
  }
}
