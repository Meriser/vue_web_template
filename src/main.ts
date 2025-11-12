import { createApp } from 'vue';
import App from './App.vue';

// 建立 Vue 應用程式
const app = createApp(App);

// Pinia 狀態管理
import { setupStore } from '@/stores/store'
const pinia = setupStore();

// Router 路由管理
import router from './router';

// Element Plus UI 框架
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhTw from 'element-plus/es/locale/lang/zh-tw'; // 繁體中文語言包

// 引入所有 SCSS 檔案 (包含 Tailwind CSS)
import '@/styles/all.scss';

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhTw, // 設定語言為繁體中文
});
app.mount('#app')
