export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
