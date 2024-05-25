import { createRouter, createWebHistory } from "vue-router";
import RegistroRoute from './RegistroRoute'
import RedzoneRoute from "./RedzoneRoute";
import departamentoRoute from "./DepartamentoRoute";
import UsuarioRoute from "./UsuarioRoute";
import LoginRoute from "./LoginRoute";
import handleLocalStorage from "../utils/handleLocalStorage";
import PerfilRoutes from "./PerfilRoute";
import RecuperarSenhaRoute from "./RecuperarSenhaRoute";

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
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {
  const rotasPermitidas = [
    'login',
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
    'relatorioDepartamento'
  ];
  const rotasPermitidasGuarda = [
    'login',
    'perfil',
    'registro',
    'redzone',
    'Logs',
    'filtragem'
  ]

  const rotasPermitidasAdmArea = [
    'login',
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
  if (!usuarioLogado && ![...rotasPermitidasSemLogin].includes(to.name as string) ) {
    return {name: 'login'}
  }
  if (usuarioLogado && usuarioLogado.autorizacoes && usuarioLogado.autorizacoes.includes("ROLE_GUARD") && ![...rotasPermitidasGuarda].includes(to.name as string)) {
    return { name: 'redzone'}
  }
  if (usuarioLogado && usuarioLogado.autorizacoes && usuarioLogado.autorizacoes.includes("ROLE_MANAGER") && ![...rotasPermitidasAdmArea].includes(to.name as string)) {
    return { name: 'departamentos'}
  }

})



export default router;
