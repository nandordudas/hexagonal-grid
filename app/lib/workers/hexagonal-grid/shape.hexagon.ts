import { Shape, type ShapeOptions } from './shape'
import { Vector2D } from './vector-2d'

const TAU = Math.PI * 2

interface HexagonOptions extends ShapeOptions {
  radius: number
  axialCoordinates?: { q: number, r: number }
}

export class Hexagon extends Shape {
  static readonly SIDES = 6
  static readonly ANGLE = TAU / Hexagon.SIDES

  static create(options: HexagonOptions): Hexagon {
    return new Hexagon(options)
  }

  highlight: boolean = false

  readonly radius: number
  axialCoordinates: { q: number, r: number }

  constructor(options: HexagonOptions) {
    super(options)

    this.radius = options.radius
    this.axialCoordinates = options.axialCoordinates ?? { q: 0, r: 0 }
  }

  override draw(context: OffscreenCanvasRenderingContext2D): void {
    context.strokeStyle = 'rgb(from tomato r g b / 0.6)'
    context.fillStyle = 'rgb(from tomato r g b / 0.2)'

    context.beginPath()

    const point = Vector2D.create(this.radius, 0)

    for (let i = 0; i < Hexagon.SIDES; ++i) {
      const { x, y } = point.clone().add(this.position)

      if (i === 0)
        context.moveTo(x, y)
      else
        context.lineTo(x, y)

      point.transform(Hexagon.ANGLE)
    }

    context.closePath()

    if (this.highlight)
      context.fill()

    context.stroke()
  }

  vertices(): Vector2D[] {
    const vertices: Vector2D[] = []
    const point = Vector2D.create(this.radius, 0)

    for (let i = 0; i < Hexagon.SIDES; ++i) {
      const { x, y } = point.clone().add(this.position)

      vertices.push(Vector2D.create(x, y))
      point.transform(Hexagon.ANGLE)
    }

    return vertices
  }

  drawHelper(
    context: OffscreenCanvasRenderingContext2D,
    options?: { showRadius: boolean },
  ): void {
    context.save()

    context.strokeStyle = 'rgb(from tomato r g b / 0.6)'
    context.fillStyle = 'rgb(from tomato r g b / 0.2)'

    context.beginPath()
    context.arc(this.position.x, this.position.y, 4, 0, TAU)
    context.fill()

    if (!options?.showRadius)
      return

    context.beginPath()
    context.moveTo(this.position.x, this.position.y)
    context.lineTo(this.position.x + this.radius, this.position.y)
    context.stroke()
    context.restore()
  }
}
