import DashboardView from '../views/dashboard/DashboardView.vue'

const dashboardRoute = {
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: 'Dashboard'
  },
  component: DashboardView
};

export default dashboardRoute;
