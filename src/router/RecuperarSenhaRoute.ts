import RecuperacaoView from "../views/recuperacaoSenha/RecuperacaoView.vue"
import RecuperarSenhaComponent from '../components/recuperarSenha/RecuperarSenhaComponent.vue'
import ConferirTokenComponent from '../components/recuperarSenha/ConferirTokenComponent.vue'

const RecuperarSenhaRoute = {
  path: '/recuperar-senha',
  component: RecuperacaoView,
  children: [
    {
      path: '',
      name: 'recuperarSenha',
      meta: {
        title: 'Recuperar Senha'
      },
      component: RecuperarSenhaComponent
    },
    {
      path: 'conferir-token',
      name: 'conferirToken',
      meta: {
        title: 'Conferir Token'
      },
      component: ConferirTokenComponent

    }
  ]

};

export default RecuperarSenhaRoute;
