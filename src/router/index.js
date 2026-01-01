import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import OAuthPage from '@/views/OAuthPage.vue'


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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((routeTo, routeFrom, next) => {
  const publicPages = ["/login", "/register", "/forgot-password", "/oauth"];
  const authpage = !publicPages.includes(routeTo.path);
  const loggeduser = localStorage.currentUser ? true : false;
  console.log('didn fubd the ', loggeduser)
  if (authpage && !loggeduser) 
  if (authpage) {
    router.push("/login");
  } 
  else {
    console.log("Hello");
    next();
  }
  // console.log("first  ",publicPages, "\nrouteTo",routeTo.path, "\nrouteFrom",routeFrom.path, "\nrouteto",routeTo);
  next();
});
export default router
