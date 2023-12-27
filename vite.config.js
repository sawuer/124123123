import { defineConfig } from 'vite';
import htmlPlugin from 'vite-plugin-html-config';
import copy from 'rollup-plugin-copy';
import packageInfo from './package.json';

export default defineConfig({
  publicDir: 'reference',
  plugins: [
    htmlPlugin({
      headScripts: [
        {
          src:
            process.env.NODE_ENV === 'production'
              ? `/assets/web-components.min.js?v=${packageInfo.version}`
              : './node_modules/@stoplight/elements/web-components.min.js',
        },
      ],
    }),
    copy({
      targets: [
        {
          src: './node_modules/@stoplight/elements/web-components.min.js',
          dest: './dist/assets',
        },
      ],
      hook: 'writeBundle',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
