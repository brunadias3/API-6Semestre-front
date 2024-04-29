import UsuarioCreateView from "../views/usuario/UsuarioCreateView.vue";
import UsuarioView from "../views/usuario/UsuarioView.vue";

const UsuarioRoute = [
  {
    path: "/usuarios",
    children: [
      {
        path: "/usuarios",
        name: "usuarios",
        meta: {
          title: "Usuarios",
        },
        component: UsuarioView,
      },
      {
        path: "criar-usuarios",
        name: "criarUsuarios",
        meta: {
          title: "Criar Usuario",
        },
        component: UsuarioCreateView,
      },
    ],
  }
];

export default UsuarioRoute;
