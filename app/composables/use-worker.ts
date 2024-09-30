type WorkerConstructor = new (options?: {
  name?: string
}) => Worker

interface WorkerData<T extends string, P> {
  type: T
  data?: P
}

const debug = logger.withTag('composable:use-worker').debug

export function useWorker<T extends Record<string, any>>(
  WorkerConstructor: WorkerConstructor,
  options?: ConstructorParameters<WorkerConstructor>[0],
) {
  debug('creating worker:', { WorkerConstructor, options })

  const worker = new WorkerConstructor(options)

  onScopeDispose(stop)

  function post<K extends keyof T>(
    data: WorkerData<K & string, T[K]>,
    transfer?: StructuredSerializeOptions,
  ) {
    debug('posting message to worker:', { data, ...transfer })
    worker.postMessage(data, transfer)
  }

  function stop() {
    debug('terminating worker...')
    worker.terminate()
  }

  return {
    worker,
    post,
  }
}
