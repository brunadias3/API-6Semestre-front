<template>
  <v-app>
    <v-main>
      <HeaderComponent v-if="loginService.usuarioLogado"/>
      <div>
        <RouterView />
      </div>
    </v-main>
    <div>
      <MainNotification />
    </div>
    <div fixed>
      <FooterComponent />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import MainNotification from './components/MainNotification.vue';
import handleLocalStorage from './utils/handleLocalStorage';
import { LoginStore } from './stores';
import { onMounted } from 'vue';
import IUsuarioLogado from './interfaces/IUsuarioLogado';
const usuarioLogado: any = handleLocalStorage.get('usuarioLogado') as any;
const loginService = LoginStore();

onMounted(() => {
  loginService.usuarioLogado = handleLocalStorage.get('usuarioLogado') as IUsuarioLogado
})
</script>
