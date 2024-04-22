import DepartamentoView from '../views/DepartamentoView.vue'
import TabelaDepartamentoComponent from '../components/departamento/TabelaDepartamentoComponent.vue'
import CriarDepartamentoComponent from '../components/departamento/CriarDepartamentoComponent.vue';

const departamentoRoute = {
  path: '/departamentos',
  component: DepartamentoView,
  children: [
    {
      path: '',
      name: 'departamentos',
      meta: {
        title: 'departamento'
      },
      component: TabelaDepartamentoComponent
    },
    {
      path: 'criar-departamento',
      name: 'criarDepartamento',
      meta: {
        title: 'criarDepartamento'
      },
      component: CriarDepartamentoComponent
    },
  ]

};

export default departamentoRoute;