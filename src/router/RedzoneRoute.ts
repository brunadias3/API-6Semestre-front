import RedzoneListView from '../views/redzone/RedzoneListView.vue'
import RedzoneCreateView from '../views/redzone/RedzoneCreateView.vue'
import RedzoneUpdateView from '../views/redzone/RedzoneUpdateView.vue';

const redzoneRoutes = [
  {
    path: '/redzone',
    children: [
      { path: '/redzone', component: RedzoneListView },
      { path: 'create', name: 'create', component: RedzoneCreateView },
      { path: 'update/:id', name: 'update', component: RedzoneUpdateView },
    ]
  }
];

export default redzoneRoutes
