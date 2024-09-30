import type { Drawable } from './renderer'
import type { Vector2D } from './vector-2d'

export interface ShapeOptions {
  position: Vector2D
}

export abstract class Shape implements Drawable {
  readonly #position: Vector2D

  get position() {
    return this.#position
  }

  constructor(options: ShapeOptions) {
    this.#position = options.position
  }

  abstract draw(context: OffscreenCanvasRenderingContext2D): void
}
