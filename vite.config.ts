import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import tsConfigPaths from 'vite-tsconfig-paths';

import * as packageJson from './package.json';

const dependencies = [
    'react',
    ...Object.keys(packageJson.dependencies || {})
];

export default defineConfig(configEnv => ({
    plugins: [
        tsConfigPaths(),
        linterPlugin({
            include: ['./src/**/*.{ts}'],
            linters: [new EsLinter({ configEnv })],
        }),
        dts({
            include: ['src/'],
        }),
    ],
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'Reactflow Hooks',
            formats: ['es'],
            fileName: 'index',
        },
        rollupOptions: {
            external: dependencies,
            output: {
                globals: Object.fromEntries(dependencies.map(dep => [dep, dep])),
            },
        },
    },
}));
