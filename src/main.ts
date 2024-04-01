/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia';

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createPinia());

registerPlugins(app)
app.mount('#app')
