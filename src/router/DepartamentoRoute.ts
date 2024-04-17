import DepartamentoView from '../views/DepartamentoView.vue'
import TabelaDepartamentoComponent from '../components/departamento/TabelaDepartamentoComponent.vue'

const departamentoRoute = {
  path: '/departamento',
  component: DepartamentoView,
  children: [
    {
      path: '',
      name: 'departamento',
      meta: {
        title: 'departamento'
      },
      component: TabelaDepartamentoComponent
    }
  ]

};

export default departamentoRoute;