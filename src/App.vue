<template>
  <v-app>
    <v-main>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <RouterView />
      </div>
    </v-main>
    <v-footer fixed style="padding: 0 !important;">
      <FooterComponent />
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



</script>
