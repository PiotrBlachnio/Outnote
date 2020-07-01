import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/auth',
    component: {
      render(c) {
        return c('router-view');
      }
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: {
          title: 'Notes App | Login'
        },
        component: () => import('@/views/auth/Login')
      },
      {
        path: 'register',
        name: 'Register',
        meta: {
          title: 'Notes App | Register'
        },
        component: () => import('@/views/auth/Register')
      },
      {
        path: 'forgot-password',
        name: 'Forgot Password',
        meta: {
          title: 'Notes App | Forgot Password'
        },
        component: () => import('@/views/auth/ForgotPassword')
      },
      {
        path: 'reset-password',
        name: 'Reset Password',
        meta: {
          title: 'Notes App | Reset Password'
        },
        component: () => import('@/views/auth/ResetPassword')
      },
      {
        path: 'confirm-email',
        name: 'Confirm Email',
        meta: {
          title: 'Notes App | Confirm EMail'
        },
        component: () => import('@/views/auth/ConfirmEmail')
      }
    ]
  },
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true,
      title: 'User Dashboard'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userAuthStatus) {
      next();
      return;
    }
    next('/auth/login');
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
