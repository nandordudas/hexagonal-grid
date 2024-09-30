# [OffscreenCanvas] Experiment

> [!NOTE]
> This is an experimental project that draws a hexagonal grid using `OffscreenCanvas`. The code is more complex than necessary for creating a simple hexagonal grid with `HTMLCanvasElement`. The purpose is to test the performance of `OffscreenCanvas` and gain hands-on experience with it.

> [!TIP]
> It's recommended to run Nuxt.js in development mode with [https]. To do so, create a `~/.nuxtrc` file with the following content:
>
> ```env
> # These paths are specific to my WSL2 setup
> devServer.https.key=/mnt/c/Users/NandorDudas/localhost+3-key.pem
> devServer.https.cert=/mnt/c/Users/NandorDudas/localhost+3.pem
> ```
>
> Use [mkcert] to generate the key and certificate, and follow the setup instructions.
>
> 🤫 All your Nuxt.js projects will now run in https mode.

## What's Happening Here?

This project draws a simple hexagonal grid on a canvas using `OffscreenCanvas`. The grid is rendered on the offscreen canvas and then transferred to the main canvas for display.

> You can enable debug logger by updating the logger instance and update `logLevel` property.

The application starts at `app.vue`, with the index page rendering the canvas. The hexagonal grid is drawn in the `components/app/CanvasWrapper.vue` component, which is loaded in client-only mode because `Worker` is unavailable in server environments. The page itself is wrapped in a layout.

The `CanvasWrapper.vue` component uses the `components/app/Canvas.vue` component to display the canvas. `Canvas.vue` handles the actual grid drawing. Some helper functions in the `composables` directory handle canvas and worker-related tasks.

The worker, located in the `lib/workers/hexagonal-grid` directory, is responsible for drawing the grid on the offscreen canvas. The worker is created in the `composables/use-worker.ts` composable function and used within `CanvasWrapper.vue`.

To streamline development, the worker reloads on any code change. However, this hot module replacement (HMR) behavior can interfere with some workflows, so exporting event listeners from the worker file is recommended.

> [!WARNING]
> Every time the worker reloads, the Tailwind CSS JIT compiler recompiles the CSS files, which may throw an error.

> [!NOTE]
> Some boilerplate code in the `lib/hexagonal-grid` directory simplifies communication between the main thread and the worker. This includes classes for event emitting and settings.

You only need to check the `lib/hexagonal-grid/runner.ts` file to understand the hexagonal grid's drawing mechanism. The other files provide insight into how the application is structured.

Mouse coordinates are passed to the worker using a [SharedArrayBuffer], which is used to highlight the hovered hexagon. The highlighted hexagon is drawn on the main canvas, and the offscreen canvas is transferred afterward. This method allows for handling mouse interactions since the worker cannot directly access mouse events.

<details>
<summary>Click to see the hexagonal grid</summary>

![Level 0](assets/level-0.png)
![Level 1](assets/level-1.png)
![Level 2](assets/level-2.png)
![Level 3](assets/level-3.png)
![Level 3 Hover](assets/level-3-hover.png)
</details>

## How to Run This Project?

1. Clone the repository.
2. Run `pnpm install` to install dependencies.
3. Run `pnpm dev` to start the development server.

> [!TIP]
> Consider using [ni]:
>
> ```bash
> npm install --global @antfu/ni
> ```

[OffscreenCanvas]: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
[mkcert]: https://github.com/FiloSottile/mkcert
[https]: https://nuxt.com/docs/api/nuxt-config#https
[ni]: https://github.com/antfu-collective/ni
[SharedArrayBuffer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
