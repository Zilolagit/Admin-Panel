import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import("@/views/SettingsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/brands',
    name: 'brands',
    component: () => import("@/views/BrandsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/models',
    name: 'models',
    component: () => import("@/views/ModelsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import("@/views/LocationsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/cities',
    name: 'cities',
    component: () => import("@/views/CitiesPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/cars',
    name: 'cars',
    component: () => import("@/views/CarsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!accessToken || !refreshToken) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
