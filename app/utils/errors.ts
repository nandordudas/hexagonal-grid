export function assert(
  condition: unknown,
  message = 'Assertion failed',
  ErrorType: ErrorConstructor = Error,
): asserts condition {
  if (!condition)
    raiseError(message, ErrorType)
}

export function raiseError(
  message: string,
  ErrorType: ErrorConstructor = Error,
): never {
  throw new ErrorType(message)
}
