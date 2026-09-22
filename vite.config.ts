import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    root: './',
    base: './',
    publicDir: 'prototype/assets',

    plugins: [
      {
        name: 'serve-prototype-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Rewrite /assets/... to /prototype/assets/... if needed
            if (req.url && req.url.startsWith('/assets/') && !req.url.includes('/@fs/')) {
              req.url = '/prototype' + req.url;
            }
            next();
          });
        }
      }
    ],

    resolve: {
      alias: {
        '@core': path.resolve(__dirname, './src/core'),
        '@engines': path.resolve(__dirname, './src/engines'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@audio': path.resolve(__dirname, './src/audio'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './prototype/assets')
      }
    },

    server: {
      port: 3000,
      open: false,
      cors: true,
      hmr: {
        overlay: true
      }
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDev,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev
        }
      },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      }
    }
  };
});
