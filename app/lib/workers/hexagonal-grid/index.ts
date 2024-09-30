import { errorEventHandler } from './event-handlers/error.event-handler'
import { messageEventHandler } from './event-handlers/message.event-handler'

const addEventListener = globalThis.addEventListener.bind(globalThis)

/**
 * Extracting event handlers can significantly improve the performance and
 * responsiveness of your application when using hot reload, as it reduces the
 * amount of code that needs to be recompiled and re-rendered.
 */
addEventListener('error', errorEventHandler)
addEventListener('message', messageEventHandler)

logger
  .withTag('worker:hexagonal-grid')
  .debug('has loaded')
