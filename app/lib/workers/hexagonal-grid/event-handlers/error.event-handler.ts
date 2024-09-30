const error = logger.withTag('worker:hexagonal-grid:error-event.handler').error

export function errorEventHandler(event: ErrorEvent) {
  error(event)
}
