import { build } from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';

build({
    entryPoints: ['pog.ts'],
    bundle: true,
    outfile: 'out.js',
    plugins: [inlineWorkerPlugin()]
});