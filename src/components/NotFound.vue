<template>
  <v-container class="d-flex align-center justify-center fill-height" fluid>
    <v-row class="text-center mt-16">
      <v-col cols="12">
        <h2 class="subtitle-1 "><v-icon icon="mdi mdi-exclamation"/>Página não encontrada</h2>
        <v-btn color="primary" @click="goHome">Voltar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.back()
};
</script>

