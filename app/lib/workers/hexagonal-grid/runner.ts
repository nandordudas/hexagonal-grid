import type { Engine, RunCallback } from './engine'
import { settings } from './settings'
import { Hexagon } from './shape.hexagon'
import { Vector2D } from './vector-2d'

interface DrawHexagonalGridOptions {
  engine: Engine
  level?: number
}

const SQRT_3 = Math.sqrt(3)

export const runner: RunCallback = ({ engine }) => {
  drawHexagonalGrid({ engine, level: 3 })
}

function drawHexagonalGrid(options: DrawHexagonalGridOptions) {
  const level = options.level ?? 1
  const { width, height } = options.engine.renderer
  const canvasCenter = Vector2D.create(width / 2, height / 2)
  const mouseCoordinates = settings.get('mouseCoordinates')

  const hexagonRadius = 30
  const hexagonHeight = hexagonRadius * SQRT_3
  const hexagonWidth = hexagonRadius * 2

  for (let q = -level; q <= level; ++q) {
    for (let r = Math.max(-level, -q - level); r <= Math.min(level, -q + level); ++r) {
      const hexagon = Hexagon.create({
        radius: hexagonRadius,
        position: canvasCenter
          .clone()
          .add(Vector2D.create((q * hexagonWidth * 3 / 4), ((r + q / 2) * hexagonHeight))),
      })

      if (mouseCoordinates)
        hexagon.highlight = isPointInPolygon(mouseCoordinates, hexagon.vertices())

      options.engine.renderer.render(hexagon)
      hexagon.drawHelper(options.engine.renderer.context)
    }
  }
}
