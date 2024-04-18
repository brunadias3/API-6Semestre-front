import { createRouter, createWebHistory } from "vue-router";
import RegistroRoute from './RegistroRoute'
import RedzoneRoute from "./RedzoneRoute";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RegistroRoute,
    RedzoneRoute,
  ],
  scrollBehavior() {
    return { top:0 };
  }
});


export default router;
