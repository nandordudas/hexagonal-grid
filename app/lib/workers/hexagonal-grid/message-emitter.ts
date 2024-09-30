import { Engine } from './engine'
import { Renderer } from './renderer'
import { runner } from './runner'
import { listenForAtomicsUpdatesAsync } from './utils'

interface MessageEvents {
  error: ErrorEvent
  init: {
    offscreenCanvas: OffscreenCanvas
    sharedBuffer: SharedArrayBuffer
  }
}

type MessageEventTypes = keyof MessageEvents

export interface MessageEventData {
  type: MessageEventTypes
  data: MessageEvents[MessageEventTypes]
}

const debug = logger.withTag('worker:hexagonal-grid:message-emitter').debug

export const messageEmitter = new EventEmitter<MessageEvents>()

messageEmitter.once('init', (data) => {
  debug('initializing...')

  const context = data.offscreenCanvas.getContext('2d')

  assert(context !== null, 'Failed to get 2d context from offscreen canvas', TypeError)

  const engine = new Engine({
    renderer: new Renderer({ context }),
  })

  engine.run(runner)

  const mouseCoordinates = new Uint16Array(data.sharedBuffer, 0, 2)

  listenForAtomicsUpdatesAsync(
    mouseCoordinates,
    new Int32Array(data.sharedBuffer, mouseCoordinates.byteLength, 1),
  )
})
