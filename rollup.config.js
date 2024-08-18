import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.esm.js',
                format: 'es',
            },
        ],
        external: ['react', 'react-dom'],
        plugins: [
            resolve({
                extensions: ['.ts', '.tsx']
            }),
            typescript({
                tsconfig: './tsconfig.json',
                include: ['src/**/*', 'forge/**/*'],
                exclude: ['**/__tests__', '**/*.test.ts'],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
];

export default config;