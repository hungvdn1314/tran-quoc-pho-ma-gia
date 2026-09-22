# ⚡ Vite Configuration Template: Dual-Target Hybrid Game

Template cấu hình `vite.config.ts` tối ưu cho Trấn Quốc Phò Mã Gia, hỗ trợ đồng thời chế độ Development cực nhanh và chế độ Build xuất file phân phối tĩnh không phụ thuộc server (Dual-Target Architecture).

---

## 1. CẤU HÌNH VITE.CONFIG.TS MẪU

```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    root: './',
    base: './', // Đường dẫn tương đối để chạy được cả khi mở file trực tiếp qua file:///
    publicDir: 'prototype/assets',

    resolve: {
      alias: {
        '@core': path.resolve(__dirname, './src/core'),
        '@engines': path.resolve(__dirname, './src/engines'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@audio': path.resolve(__dirname, './src/audio'),
        '@assets': path.resolve(__dirname, './prototype/assets')
      }
    },

    server: {
      port: 8080,
      open: true,
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
        },
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {
            // Tách các thư viện nặng thành chunk riêng để trình duyệt cache tối ưu
            vendor: ['three', 'pixi.js', 'phaser']
          }
        }
      }
    },

    // Kiểm thử tự động với Vitest
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'dist/', 'tests/']
      }
    }
  };
});
```

---

## 2. CẤU HÌNH TSCONFIG.JSON MẪU

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"],
      "@engines/*": ["src/engines/*"],
      "@ui/*": ["src/ui/*"],
      "@audio/*": ["src/audio/*"],
      "@assets/*": ["prototype/assets/*"]
    }
  },
  "include": ["src", "tests", "vite.config.ts"]
}
```

---

## 3. SCRIPTS BỔ SUNG TRONG PACKAGE.JSON

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "bundle:data": "python scripts/bundle_game_data.py"
  }
}
```
