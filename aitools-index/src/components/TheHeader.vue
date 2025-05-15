<template>
  <header class="app-header">
    <nav class="header-nav container">
      <div class="logo">
        <!-- 您可以将下方 router-link 替换为实际的 img 标签和 Logo 图片 -->
        <router-link to="/" class="logo-link">MeetMind</router-link>
      </div>
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.name">
          <router-link :to="item.path" class="nav-link">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="header-actions"> 
        <div class="language-switcher">
          <select v-model="currentLanguage" @change="handleLanguageChange" class="language-select">
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
            <router-link to="/login" class="login-button">登录</router-link>
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

const router = useRouter();

const isLoggedIn = ref(false);

const menuItems = ref([
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
]);

const availableLanguages = ref([
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  // 您可以根据需要添加更多语言
]);

const currentLanguage = ref('en'); // 默认语言

function handleLanguageChange(event) {
  const newLang = event.target.value;
  currentLanguage.value = newLang;
  // 实际项目中，这里会调用 i18n 库来切换全局语言
  // 例如: i18n.global.locale.value = newLang;
  console.log(`Language changed to: ${newLang}`);
  // 可能需要重新加载页面或强制组件更新以使 i18n 生效，具体取决于 i18n 设置
}

// 如果使用 BaseButton，可以定义一个跳转方法
// function goToLogin() {
//   router.push('/login'); // 确保 '/login' 路由已定义
// }
</script>

<style scoped lang="scss">
.app-header {
  background-color: #ffffff; // 保持简洁的白色背景
  padding: 1rem 0; // 增加垂直内边距，提升头部区域的存在感
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07); // 更柔和但范围更广的阴影，增加层次感
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px; // 可以适当增加最大宽度以适应更宽的屏幕
  margin: 0 auto;
  padding: 0 1.5rem; // 调整左右内边距
}

.logo-link {
  font-size: 2rem; // 进一步增大 Logo 字体
  font-weight: 700;
  color: #1A202C; // 使用更深沉的颜色，如 Tailwind CSS 的 gray-800
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3182CE; // 悬停时使用鲜明的品牌色，如 Tailwind CSS 的 blue-600
  }
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 3rem; // 进一步增大菜单项间距
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #4A5568; // 菜单项常规颜色，如 Tailwind CSS 的 gray-600
  font-size: 1.05rem; // 略微增大菜单项字体
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease, font-weight 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2.5px; // 下划线加粗
    bottom: -4px; // 调整下划线位置
    left: 50%;
    transform: translateX(-50%);
    background-color: #3182CE; // 下划线使用品牌色
    transition: width 0.3s ease;
  }

  &:hover,
  &.router-link-exact-active {
    color: #3182CE; // 悬停和激活状态使用品牌色
    font-weight: 600; // 字体加粗
    &::after {
      width: 100%;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.8rem; // 调整语言切换器和用户区域之间的间距
}

.language-switcher {
  position: relative;
}

.language-select {
  background-color: #F7FAFC; // 使用非常浅的背景色，如 Tailwind CSS 的 gray-100
  border: 1px solid #E2E8F0; // 边框颜色，如 Tailwind CSS 的 gray-300
  padding: 0.5rem 1rem; // 调整内边距
  border-radius: 8px; // 更现代的圆角
  font-size: 0.9rem;
  color: #2D3748; // 文字颜色，如 Tailwind CSS 的 gray-700
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none; // 移除默认下拉箭头，可以考虑自定义箭头
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23718096'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E"); // 自定义箭头 (Tailwind 风格)
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em 1em;
  padding-right: 2.5rem; // 为自定义箭头留出空间

  &:hover {
    border-color: #A0AEC0; // 悬停时边框颜色，如 Tailwind CSS 的 gray-500
  }

  &:focus {
    outline: none;
    border-color: #3182CE; // 焦点时使用品牌色边框
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.25); // 焦点时添加品牌色阴影
  }
}

.user-area {
  display: flex;
  align-items: center;
}

.login-button {
  background-color: #3182CE; // 登录按钮使用品牌色
  color: white;
  padding: 0.7rem 1.8rem; // 调整按钮内边距
  border-radius: 8px; // 更现代的圆角
  text-decoration: none;
  font-weight: 600; // 字体加粗
  font-size: 0.95rem;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(49, 130, 206, 0.25); // 为按钮添加匹配的阴影

  &:hover {
    background-color: #2B6CB0; // 悬停时加深品牌色，如 Tailwind CSS 的 blue-700
    transform: translateY(-2px) scale(1.02); // 更明显的悬停动效
    box-shadow: 0 4px 8px rgba(49, 130, 206, 0.3);
  }
}

.user-avatar img {
  width: 42px; // 略微增大头像尺寸
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3182CE; // 头像边框使用品牌色
  box-shadow: 0 0 8px rgba(49, 130, 206, 0.3); // 为头像添加光晕效果
}

// 响应式设计：小屏幕下菜单可以考虑折叠
@media (max-width: 768px) {
  .nav-menu {
    display: none; 
  }
  .header-nav {
    padding: 0 1rem; // 移动端内边距可以小一些
  }
  .logo-link {
    font-size: 1.7rem; // 移动端 Logo 稍小
  }
  .header-actions {
    gap: 1rem; // 移动端动作区域间距缩小
  }
}
</style>