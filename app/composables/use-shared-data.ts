const MOUSE_COORDINATES_SIZE = Uint16Array.BYTES_PER_ELEMENT * 2
const UPDATE_FLAG_SIZE = Int32Array.BYTES_PER_ELEMENT * 1

const totalBufferSize = MOUSE_COORDINATES_SIZE + UPDATE_FLAG_SIZE

const sharedBuffer = new SharedArrayBuffer(totalBufferSize)
const mouseCoordinates = new Uint16Array(sharedBuffer, 0, 2)
const updateFlag = new Int32Array(sharedBuffer, mouseCoordinates.byteLength, 1)

export function useSharedData() {
  return {
    sharedBuffer,
    onMouseEvent,
  }
}

// eslint-disable-next-line no-restricted-syntax
export const enum MouseCoordinates {
  X = 0,
  Y = 1,
}

function onMouseEvent(event: MouseEvent) {
  Atomics.store(mouseCoordinates, MouseCoordinates.X, event.offsetX)
  Atomics.store(mouseCoordinates, MouseCoordinates.Y, event.offsetY)

  notifyWorker()
}

function notifyWorker() {
  // Atomics.add(updateFlag, 0, 1)
  Atomics.notify(updateFlag, 0)
}
