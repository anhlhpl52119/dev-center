import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { defineNuxtModule } from '@nuxt/kit';

const execAsync = promisify(exec);

export default defineNuxtModule({
  async setup(_, nuxt) {
    const options = {
      codegenCommand: 'npx graphql-codegen',
    };

    let isGenerating = false;

    const runCodegen = async (reason: string) => {
      if (isGenerating)
        return;

      isGenerating = true;

      try {
        console.log(
          `🔄 [graphql-codegen] Running codegen for (${reason.toUpperCase()}) steps...`,
        );
        const startTime = Date.now();

        await execAsync(options.codegenCommand, {
          cwd: nuxt.options.rootDir,
        });

        console.log(
          `🚀 [graphql-codegen] Generated Completed in ${Date.now() - startTime}ms`,
        );
      }
      catch (error: any) {
        console.error('‼️ [graphql-codegen] Module error:', error.message);
      }
      finally {
        isGenerating = false;
      }
    };

    nuxt.hook('prepare:types', async () => {
      await runCodegen('prepare');
    });

    nuxt.hook('build:before', async () => {
      await runCodegen('build');
    });

    console.log('🌱 [graphql-codegen] Module initialized');
  },
});
