import { settings } from './settings'

const debug = logger.withTag('worker:hexagonal-grid:utils').debug

export async function listenForAtomicsUpdatesAsync(
  mouseCoordinates: Uint16Array,
  updateFlag: Int32Array,
) {
  const value = Atomics.load(updateFlag, 0)
  const result = await Atomics.waitAsync(updateFlag, 0, value).value

  if (result !== 'ok') {
    debug('failed to wait for updates:', result)

    return listenForAtomicsUpdatesAsync(mouseCoordinates, updateFlag)
  }

  settings.set('mouseCoordinates', mouseCoordinatesToObject(mouseCoordinates))
  listenForAtomicsUpdatesAsync(mouseCoordinates, updateFlag)
}

function mouseCoordinatesToObject(mouseCoordinates: Uint16Array) {
  return {
    x: mouseCoordinates[MouseCoordinates.X]!,
    y: mouseCoordinates[MouseCoordinates.Y]!,
  }
}
