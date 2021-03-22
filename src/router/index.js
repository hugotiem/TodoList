import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home';
import Login from '../view/login';

import store from '../store/';

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
    // verifie si un token existe = user connecté
    beforeEnter: (to, from, next) => {
      const token = store.state.account.token; 
      if(token) {
        next();
      } else {
        next('/login');
      }
    },
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = store.state.account.token; 
      if(token) {
        next({path: '/'});
      } else {
        next();
      }
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router