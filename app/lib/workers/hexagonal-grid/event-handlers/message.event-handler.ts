import { messageEmitter, type MessageEventData } from '~/lib/workers/hexagonal-grid/message-emitter'

const debug = logger.withTag('worker:hexagonal-grid:message-event.handler').debug

export function messageEventHandler(event: MessageEvent<MessageEventData>) {
  debug('received message:', event.data)
  messageEmitter.emit(event.data.type, event.data.data)
}
