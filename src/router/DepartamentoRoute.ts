import DepartamentoView from '../views/DepartamentoView.vue'
import TabelaDepartamentoComponent from '../components/departamento/TabelaDepartamentoComponent.vue'

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
    }
  ]

};

export default departamentoRoute;