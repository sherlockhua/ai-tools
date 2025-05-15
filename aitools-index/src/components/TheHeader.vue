<template>
  <header class="main-header"> 
    <nav class="header-nav container">
      <div class="logo">
        <!-- 您可以将下方 router-link 替换为实际的 img 标签和 Logo 图片 -->
        <router-link to="/" class="logo-link">{{ $t('header.logoText') }}</router-link>
      </div>
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.nameKey">
          <router-link :to="item.path" class="nav-link">{{ $t(item.nameKey) }}</router-link>
        </li>
      </ul>
      <div class="header-actions"> 
        <div class="language-switcher">
          <select v-model="locale" class="language-select"> {/* 直接绑定到 i18n 的 locale */}
            <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </div>
        <div class="user-area">
          <template v-if="isLoggedIn">
            <div class="user-avatar">
              <!-- 替换为实际用户头像 -->
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="login-button">{{ $t('header.login') }}</router-link>
            <!-- 您也可以使用 BaseButton 组件: <BaseButton variant="primary" @click="goToLogin">登录</BaseButton> -->
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'; // 导入 useI18n

const router = useRouter();
const { locale, t } = useI18n(); // 获取 i18n 的 locale 和 t 函数

const isLoggedIn = ref(false);

const menuItems = ref([ // 更新为使用翻译键
  { nameKey: 'header.features', path: '/features' },
  { nameKey: 'header.pricing', path: '/pricing' },
  { nameKey: 'header.contact', path: '/contact' },
]);

const availableLanguages = ref([ // 这个列表应与 main.js 中加载的语言一致
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]);

// currentLanguage ref 不再需要，直接使用 i18n 的 locale
// const currentLanguage = ref('en'); 

// handleLanguageChange 函数也不再需要，v-model="locale" 会自动更新
/*
function handleLanguageChange(event) {
  const newLang = event.target.value;
  locale.value = newLang; // 更新 i18n 的当前语言
  console.log(`Language changed to: ${newLang}`);
}
*/

// 如果使用 BaseButton，可以定义一个跳转方法
// function goToLogin() {
//   router.push('/login'); // 确保 '/login' 路由已定义
// }
</script>

<style scoped lang="scss">
.main-header {
  background-color: var(--color-bg-header);
  padding: 0.8rem 0; // Reduced padding slightly
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm); // Added subtle shadow instead of just border
  // border-bottom: 1px solid var(--color-border-light); // Alternative to shadow

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px; // Wider container for header
  }
}

.logo-link {
  font-size: 1.75rem; // Slightly larger logo text
  font-weight: 700;
  color: var(--color-text-primary); // Logo text color
  text-decoration: none;

  &:hover {
    color: var(--color-primary); // Hover color for logo
    text-decoration: none;
  }
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 1.8rem; // Adjusted gap
  margin: 0;
  padding: 0;

  .nav-link {
    color: var(--color-text-secondary); // Nav link color
    text-decoration: none;
    font-weight: 500; // Medium weight
    font-size: 0.95rem; // Slightly smaller nav links
    padding: 0.5rem 0.25rem; // Add some padding for better click area
    position: relative;
    transition: color 0.2s ease;

    &::after { // Underline effect on hover/active
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-primary);
      transition: width 0.3s ease;
    }

    &:hover,
    &.router-link-exact-active {
      color: var(--color-primary);
      text-decoration: none; // Remove default underline
    }
    
    &:hover::after,
    &.router-link-exact-active::after {
      width: 100%;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem; // Adjusted gap
}

.language-switcher {
  .language-select {
    padding: 0.5rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-bg-card);
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--color-primary);
    }
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
    }
  }
}

.user-area {
  .login-button {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    padding: 0.6rem 1.2rem; // Adjusted padding
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: background-color 0.2s ease, transform 0.1s ease;
    display: inline-block;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-primary-dark);
      text-decoration: none;
      transform: translateY(-1px);
    }
  }
  // Add styles for logged-in user if needed
}

// Mobile menu styles (if you have a burger menu)
.mobile-menu-toggle {
  display: none; // Hidden by default
  // ... styles for burger icon ...
}

@media (max-width: 992px) { // Example breakpoint for mobile
  .nav-menu {
    // display: none; // Or transform into a mobile menu
    gap: 1rem;
  }
  .logo-link {
    font-size: 1.5rem;
  }
  // .mobile-menu-toggle { display: block; }
}
</style>