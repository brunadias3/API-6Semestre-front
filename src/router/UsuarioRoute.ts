import TabelaUsuario from '../components/usuario/TabelaUsuario.vue';
import UsuarioView from '../views/usuario/UsuarioView.vue';

const UsuarioRoute = {
    path: '/usuarios',
    component: UsuarioView,
    children: [
      {
        path: '',
        name: 'usuarios',
        meta: {
          title: 'Usuarios'
        },
        component: TabelaUsuario
      }    ]
  
  };
  
export default UsuarioRoute;
