import type { Coordinates } from '~/lib/workers/hexagonal-grid/settings'
import type { Vector2D } from '~/lib/workers/hexagonal-grid/vector-2d'

export function isPointInPolygon(
  point: Coordinates,
  vertices: Vector2D[],
): boolean {
  let inside = false
  const numVertices = vertices.length

  for (let i = 0, j = numVertices - 1; i < numVertices; j = i++) {
    const { x: xi, y: yi } = vertices[i]!
    const { x: xj, y: yj } = vertices[j]!

    const intersect = ((yi > point.y) !== (yj > point.y))
      && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)

    if (intersect)
      inside = !inside
  }

  return inside
}
