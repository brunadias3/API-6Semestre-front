import { createRouter, createWebHistory } from "vue-router";
import RegistroRoute from './RegistroRoute'
import RedzoneRoute from "./RedzoneRoute";
import departamentoRoute from "./DepartamentoRoute";
import UsuarioRoute from "./UsuarioRoute";
import LoginRoute from "./LoginRoute";
import handleLocalStorage from "../utils/handleLocalStorage";
import PerfilRoutes from "./PerfilRoute";
import RecuperarSenhaRoute from "./RecuperarSenhaRoute";
import notFoundRoute from "./notFound";
import dashboardRoute from "./DashboardRoute";

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
    RecuperarSenhaRoute,
    ...PerfilRoutes,
    notFoundRoute,
    dashboardRoute
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {
  const rotasPermitidas = [
    'login',
    'dashboard',
    'perfil',
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
    'relatorioDepartamento',
    'notfound'
  ];
  const rotasPermitidasGuarda = [
    'login',
    'dashboard',
    'perfil',
    'registro',
    'redzone',
    'Logs',
    'filtragem'
  ]

  const rotasPermitidasAdmArea = [
    'login',
    'dashboard',
    'perfil',
    'registro',
    'usuarios',
    'criarUsuarios',
    'redzone',
    'editarUsuario',
    'create',
    'update',
    'filtragem',
    'Logs',
    'departamentos',
    'relatorioDepartamento'
  ]

  const rotasPermitidasSemLogin = [
    'recuperarSenha',
    'login',
    'conferirToken'
  ]

  const usuarioLogado: any = handleLocalStorage.get('usuarioLogado') as any;
  if (!usuarioLogado && ![...rotasPermitidasSemLogin].includes(to.name as string)) {
    return { name: 'login' }
  }
  if(usuarioLogado && ![...rotasPermitidas].includes(to.name as string)){
    return { name: 'notfound'}
  }
  if (usuarioLogado && usuarioLogado.autorizacoes && usuarioLogado.autorizacoes.includes("ROLE_GUARD") && ![...rotasPermitidasGuarda].includes(to.name as string)) {
    return { name: 'redzone' }
  }
  if (usuarioLogado && usuarioLogado.autorizacoes && usuarioLogado.autorizacoes.includes("ROLE_MANAGER") && ![...rotasPermitidasAdmArea].includes(to.name as string)) {
    return { name: 'departamentos' }
  }

})



export default router;
