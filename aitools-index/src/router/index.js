import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import PricingView from '../views/PricingView.vue'
import UploadView from '../views/UploadView.vue'
import ContactView from '../views/ContactView.vue'; // 导入 ContactView

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/features', name: 'Features', component: FeaturesView },
  { path: '/pricing', name: 'Pricing', component: PricingView },
  { path: '/contact', name: 'Contact', component: ContactView }, // 添加 Contact 路由
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router