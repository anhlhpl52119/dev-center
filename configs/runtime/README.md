# How to use runtimeConfig

Runtime config allows passing dynamic config and environment variables to the Nuxt app context. Read more in [Nuxt Configuration docs](https://nuxt.com/docs/getting-started/configuration), [Wiki docs](https://wiki.smilegate.net/display/SGVTN/Setup+basic+runtimeConfig+to+demonstrate+how+it+is+used).

## Table Of Content

- [Understanding runtimeConfig](#understanding-runtimeConfig)
- [Structure folder](#structure-folder)
- [Configuration](#configuration)
- [Usage](#usage)

## Understanding runtimeConfig

Runtime config allows passing dynamic config and environment variables to the Nuxt app context.

- By default, these keys are only available server-side.
- The keys within runtimeConfig.public are available client-side and server-side.

Your runtime config will be serialized before being passed to Nitro. This means that anything that cannot be serialized and then deserialized (such as functions, Sets, Maps, and so on), should not be set in your `nuxt.config`.

> **:no_entry_sign: Security note**
>
> - Be careful not to expose runtime config keys to the client-side by either rendering them or passing them to `useState`.
> - `useRuntimeConfig` only works during `setup` or `Lifecycle Hooks`.

Runtime config values are automatically replaced by matching environment variables at runtime. There are two key requirements:

1. Your desired variables must be defined in your `nuxt.config`. This ensures that arbitrary environment variables are not exposed to your application code.
2. Only a specially-named environment variable can override a runtime config property. That is, an uppercase environment variable starting with `NUXT_` which uses `_` to separate keys and case changes.

For example:

```.env
NUXT_API_SECRET=api_secret_token
NUXT_PUBLIC_API_BASE=https://nuxtjs.org
```

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '' // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  }
});
```

## Structure folder

```shell
├── configs
  ├── runtime
    ├── run-type
      ├── dev.ts
      ├── index.ts
      ├── live.ts
      ├── qa.ts
      ├── sanbox.ts
  ├── publicRuntimeConfig.ts
  ├── README.md
  ├── index.ts
├── pages
  ├── demo-config.vue
├── server
  ├── api
    ├── testRuntimeConfig.ts
├── .env
├── nuxt.config.ts
```

## Configuration

<details>
<summary>
You will need to define runtime configuration in your `nuxt.config` file, using the `runtimeConfig` option.

Here's an example in `nuxt.config.ts`:

</summary>

```ts
const RUN_TYPE = process.env.RUN_TYPE || 'live';

export default defineNuxtConfig({
  runtimeConfig: getRuntimeConfig({ RUN_TYPE })
});
```

</details>

<details>
<summary>
`getRuntimeConfig` is a function defined in the `configs/index.ts` file, which returns config and environment variables. Here's an example:
</summary>

```ts
import { getPublicRuntimeConfig } from './publicRuntimeConfig';

export interface RuntimeConfigParams {
  RUN_TYPE: string;
}

const getRuntimeOptions = function ({ RUN_TYPE }: RuntimeConfigParams): object {
  return {
    /**
     * apiSecret1, apiSecret2 is private configuration, which are only available server-side
     */
    apiSecret1: 'https://nuxtjs.org',
    apiSecret2: 'my-secret-key-2',
    /**
     * The keys within public are accessible on both the client-side and the server side
     */
    public: getPublicRuntimeConfig({ RUN_TYPE })
  };
};

export { getRuntimeConfig };
```

</details>

<details>
<summary>
`getPublicRuntimeConfig` is a function defined in the `configs/publicRuntimeConfig.ts`, represents the configuration values that you want to access on both the client-side and server-side.

Here's an example that defines a function responsible for retrieving the **public runtime** configuration based on the RUN_TYPE parameter and returning it as an object with a property called `runTypeConfig`:

</summary>

```bash
import { RuntimeConfigParams } from "./runtimeConfig";
import { getRunTypeConfig } from "./run-type";

export const getPublicRuntimeConfig = ({
  RUN_TYPE,
}: RuntimeConfigParams): object => ({
  runTypeConfig: getRunTypeConfig(RUN_TYPE),
});
```

</details>

<details>
<summary>
`getRunTypeConfig` is a function defined in the `configs/runtime/run-type/index.ts` file. It is used to retrieve variable values based on the `RUN_TYPE` environment. You can use the following code example:
</summary>

```ts
import dev from './dev';
import qa from './qa';
import sandbox from './sandbox';
import live from './live';

type RunTypeObject = Record<string, object>;

const configs: RunTypeObject = {
  dev,
  qa,
  sandbox,
  live
};

export const getRunTypeConfig = (runType: string, defaultRunType = 'pc'): object => {
  return configs[runType] || configs[defaultRunType] || {};
};
```

</details>

Example code files: dev, qa,sanbox, live...

```ts
export default {
  FIRE_BASE_API_KEY: 'FIRE_BASE_API_KEY: run-type sanbox',
  TEST_BASE_API_KEY: 'TEST_BASE_API_KEY: run-type sanbox'
};
```

## Usage

To access runtimeConfig values within your application, you can use the `useRuntimeConfig()` composable.

**Note**: Behavior is different between the client-side and server-side:

- On the client-side, only keys in public are available, and the object is both writable and reactive. The entire runtime config is available on the server-side, but it is read-only to avoid context sharing.

<details>
<summary>
Example, `pages/config.vue`:
</summary>

```vue
<template>
  <section>
    <h1>Demo Configuration in Nuxt 3: runtimeConfig</h1>

    <article>
      <h2>Test Accessing runtimeConfig values</h2>

      <p>Public keys: will be exposed on both the client-side and server-side.</p>
      <p>FIRE_BASE_API_KEY:</p>
      <div class="info info-success">
        {{ publicRunType.FIRE_BASE_API_KEY }}
      </div>
      <p>TEST_BASE_API_KEY:</p>
      <div class="info info-success">
        {{ publicRunType.TEST_BASE_API_KEY }}
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const publicRunType = runtimeConfig.public.runTypeConfig;
</script>
```

</details>

- But you can access all values in a server route:

Example `server/api/testRuntimeConfig.ts`:

```ts
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const publicRunType = runtimeConfig.public.runTypeConfig;
});
```
