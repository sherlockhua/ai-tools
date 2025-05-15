import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import PricingView from '../views/PricingView.vue'
import UploadView from '../views/UploadView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/features', name: 'Features', component: FeaturesView },
  { path: '/pricing', name: 'Pricing', component: PricingView },
  { path: '/upload', name: 'Upload', component: UploadView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router