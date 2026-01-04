import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import OAuthPage from '@/views/OAuthPage.vue'
import ActivateAccount from '@/views/ActivateAccount.vue'
import ActivatePage from '@/views/ActivatePage.vue'
import store from '@/store'
import ResetPasswordOTP from '@/views/ResetPasswordOTP.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/oauth',
    name: 'oauth',
    component: OAuthPage,
  },
  {
    path: '/activate',
    name: 'activate',
    component: ActivateAccount,
  },
  {
    path: '/active-page',
    name: 'activatePage',
    component: ActivatePage,
  },
  {
    path: '/password-otp',
    name: 'ResetpasswordOtp',
    component: ResetPasswordOTP,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((routeTo, routeFrom, next) => {
  store.commit('SET_LOADING', true)
  console.log(`before route the loader is now ${store.state.loading}`)
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    store.commit('SET_LOADING', false)
    console.log(`after route the loader is now ${store.state.loading}`)
  }, 300)
})
export default router
