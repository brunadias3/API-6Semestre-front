import { createRouter, createWebHistory } from "vue-router";
import RegistroRoute from './RegistroRoute'
import RedzoneRoute from "./RedzoneRoute";
import departamentoRoute from "./DepartamentoRoute";
import UsuarioRoute from "./UsuarioRoute";
import LoginRoute from "./LoginRoute";
import handleLocalStorage from "../utils/handleLocalStorage";

const logout = () => {
  handleLocalStorage.remove('usuarioLogado');
  return router.push({ name: 'login' });
};
let logoutInProgress = false;


const router = createRouter({
  history: createWebHistory(),
  routes: [
    LoginRoute,
    RegistroRoute,
    ...UsuarioRoute,
    ...RedzoneRoute,
    departamentoRoute,
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {
  const rotasPermitidas = [
    'login',
    'registro',
    'usuarios',
    'criarUsuarios',
    'editarUsuario',
    'create',
    'update',
    'filtragem',
    'Logs',
    'departamentos',
    'criarDepartamento',
    'editarDepartamento',
    'relatorioDepartamento'
  ];


  const usuarioLogado: any = handleLocalStorage.get('usuarioLogado') as any;
  if (!usuarioLogado) {
    if (!logoutInProgress) {
      logoutInProgress = true;
      await logout();
      logoutInProgress = false;
    }
  }

  // if (!usuarioLogado && !rotasPermitidas.includes(to.name as string)) {
  //   return logout()
  // }

})



export default router;
