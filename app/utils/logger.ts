import { createConsola, LogLevels } from 'consola'

/**
 * {@link [LogLevels](https://github.com/unjs/consola/blob/1ac116a1c415fbfc1bab57cb0a0013ccc0bc3e2c/src/constants.ts#L17)}
 */
export const logger = createConsola({
  level: LogLevels.error,
})
