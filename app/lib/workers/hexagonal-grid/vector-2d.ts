import type { Coordinates } from './settings'

/**
 * This 2D Vector class uses mutable methods, which means that the current
 * instance is mutated when calling the `transform` method. Don't forget to
 * clone the instance if you want to keep the original values.
 *
 * @throws {TypeError} if the `Vector2D` constructor is called directly.
 * @throws {TypeError} if the `x` or `y` arguments are not numbers.
 */
export class Vector2D implements Coordinates {
  static readonly #constructorSymbol = Symbol('Vector2D')

  static create(x: number, y: number): Vector2D {
    return new Vector2D(this.#constructorSymbol, x, y)
  }

  #x: number
  #y: number

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  /**
   * The `private` constructor is used to prevent use of the `new` keyword in
   * development at compile time. The static symbol is used to ensure that the
   * constructor is only called from the `create` method at runtime.
   */
  private constructor(symbol: symbol, x: number, y: number) {
    if (symbol !== Vector2D.#constructorSymbol)
      raiseError('Vector2D is not constructable', TypeError)

    assert(isNumber(x) && isNumber(y), 'Vector2D requires two numbers as arguments')

    this.#x = x
    this.#y = y
  }

  clone(): Vector2D {
    return Vector2D.create(this.#x, this.#y)
  }

  transform(angle: number): this {
    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)

    const x = this.#x * cosAngle - this.#y * sinAngle
    const y = this.#x * sinAngle + this.#y * cosAngle

    this.#x = x
    this.#y = y

    return this
  }
}
