import { errorEventHandler } from './event-handlers/error.event-handler'
import { messageEventHandler } from './event-handlers/message.event-handler'

const addEventListener = globalThis.addEventListener.bind(globalThis)

addEventListener('error', errorEventHandler)
addEventListener('message', messageEventHandler)

logger
  .withTag('worker:hexagonal-grid')
  .debug('has loaded')
