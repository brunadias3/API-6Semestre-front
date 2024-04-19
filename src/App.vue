<template>
  <v-app>
    <v-main>
        <HeaderComponent />
      <div>
        <RouterView />
      </div>
    </v-main>
    <div fixed>
      <FooterComponent />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



</script>
