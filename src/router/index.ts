import { createRouter, createWebHistory } from "vue-router";
import RegistroRoute from './RegistroRoute'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RegistroRoute
  ],
  scrollBehavior() {
    return { top:0 };
  }
});


export default router;