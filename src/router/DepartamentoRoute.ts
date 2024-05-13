import DepartamentoView from '../views/DepartamentoView.vue'
import TabelaDepartamentoComponent from '../components/departamento/TabelaDepartamentoComponent.vue'
import CriarDepartamentoComponent from '../components/departamento/CriarDepartamentoComponent.vue';
import EditarDepartamento from '../components/departamento/EditarDepartamento.vue';
import RelatorioComponent from '../components/departamento/RelatorioComponent.vue';

const departamentoRoute = {
  path: '/departamentos',
  component: DepartamentoView,
  children: [
    {
      path: '',
      name: 'departamentos',
      meta: {
        title: 'Departamentos'
      },
      component: TabelaDepartamentoComponent
    },
    {
      path: 'criar-departamento',
      name: 'criarDepartamento',
      meta: {
        title: 'criar Departamento'
      },
      component: CriarDepartamentoComponent
    },
    {
      path: 'editar-departamento/:id',
      name: 'editarDepartamento',
      meta: {
        title: 'Editar Departamento'
      },
      component: EditarDepartamento
    },
    {
      path: 'relatorio-departamento/:id',
      name: 'relatorioDepartamento',
      meta: {
        title: 'Relatorio departamento'
      },
      component: RelatorioComponent
    }

  ]

};

export default departamentoRoute;