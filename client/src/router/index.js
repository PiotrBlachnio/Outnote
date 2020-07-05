import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    meta: {
      title: 'Notes App | 404'
    },
    component: () => import('@/views/404')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: false
    },
    component: () => import('@/views/Home')
  },
  {
    path: '/auth',
    redirect: '/auth/login',
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
          title: 'Notes App | Login',
          type: 'auth'
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
        component: () => import('@/views/auth/ResetPassword'),
        beforeEnter: (to, from, next) => {
          const { user, token } = to.query;

          if (!(user && token)) next('/auth/login');
          else next();
        }
      },
      {
        path: 'confirm-email',
        name: 'Confirm Email',
        meta: {
          title: 'Notes App | Confirm EMail'
        },
        component: () => import('@/views/auth/ConfirmEmail'),
        beforeEnter: (to, from, next) => {
          const { user, token } = to.query;

          if (!(user && token)) next('/auth/login');
          else next();
        }
      },
      {
        path: 'resend-email',
        name: 'Resend Email',
        meta: {
          title: 'Notes App | Resend EMail'
        },
        component: () => import('@/views/auth/ResendEmail'),
        beforeEnter: (to, from, next) => {
          if (!to.params.email) next('/auth/login');
          else next();
        }
      }
    ]
  },
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true,
      title: 'User Dashboard'
    },
    component: () => import('@/views/dashboard/Dashboard')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters.isAuthenticated
  ) {
    next('/auth/login');
  } else if (
    to.matched.some(record => record.meta.type === 'auth') &&
    store.getters.isAuthenticated
  ) {
    next('/dashboard');
  }

  next();
});

export default router;
