import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n' // 导入 createI18n

import App from './App.vue'
import router from './router'

// 导入语言环境文件
import enMessages from './locales/en.json'
import zhCNMessages from './locales/zh-CN.json'
import esMessages from './locales/es.json'
import frMessages from './locales/fr.json'
import deMessages from './locales/de.json'

import './assets/styles/main.scss' // 假设您有全局样式

// 设置 i18n
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'en', // 设置默认语言
  fallbackLocale: 'en', // 设置回退语言
  messages: { // 加载语言包
    en: enMessages,
    'zh-CN': zhCNMessages,
    es: esMessages,
    fr: frMessages,
    de: deMessages,
  },
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n) // 在 Vue 应用中使用 i18n 实例

app.mount('#app')