import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import { color } from './src/colors/color';


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 配置 HTML 插件以支持環境變數注入
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_TITLE: env.VITE_APP_TITLE || 'Vue Web Template',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@colors': resolve(__dirname, 'src/colors'),
        '@components': resolve(__dirname, 'src/components'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@router': resolve(__dirname, 'src/router'),
        '@schemas': resolve(__dirname, 'src/schemas'),
        '@types': resolve(__dirname, 'src/types'),
        '@stores': resolve(__dirname, 'src/stores'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@views': resolve(__dirname, 'src/views'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // 暫時忽略 import 語法警告，但未來新版 sass 可能會棄用，需注意
          silenceDeprecations: ['import'], 
          additionalData: `
            $primary: ${color.primary};
            $secondary: ${color.secondary};
            $info: ${color.info};
            $success: ${color.success};
            $warning: ${color.warning};
            $danger: ${color.danger};
            $light: ${color.light};
            $dark: ${color.dark};
          `,
        },
      },
    },
  };
})