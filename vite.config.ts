import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { resolve } from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

const envFiles = ['.env', `.env.${process.env.NODE_ENV}`]

for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

export default defineConfig({
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vitest'],
      dts: 'types/auto-import.d.ts',
      eslintrc: {
        enabled: true,
        globalsPropValue: true
      },
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: 'types/components.d.ts'
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  ],
  server: {
    host: process.env.VITE_HOST,
    port: +process.env.VITE_PORT,
    open: true,
    hmr: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_DOMAIN,
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'c8',
      reporter: ['html'],
      reportsDirectory: './test/coverage'
    }
  },
  build: {
    chunkSizeWarningLimit: 2000,
    minify: process.env.VITE_NODE_ENV === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/vars.scss" as *;@use "@/styles/mixin.scss" as *;@use "@/styles/vars.pc.scss" as *;@use "@/styles/mixin.pc.scss" as *;' // for pc
        // additionalData: '@use "@/styles/vars.scss" as *;@use "@/styles/mixin.scss" as *;@use "@/styles/vars.mobile.scss" as *;@use "@/styles/mixin.mobile.scss" as *;' // for mobile
      }
    }
  }
})
