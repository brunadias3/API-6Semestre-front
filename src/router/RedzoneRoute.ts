import RedzoneListView from '../views/redzone/RedzoneListView.vue'
import RedzoneCreateView from '../views/redzone/RedzoneCreateView.vue'

const redzoneRoutes = [
  {
    path: '/redzone',
    children: [
      { path: '/redzone', component: RedzoneListView },
      { path: 'create', name: 'create', component: RedzoneCreateView },
    ]
  }
];

export default redzoneRoutes
