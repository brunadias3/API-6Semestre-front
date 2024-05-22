<template>
   <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
  </v-overlay>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="16" class="mt-16">
            <v-card-title class="text-center text-light-blue-darken-4">Redefinir senha</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="enviarEmail">
                <v-text-field v-model="recuperarSenhaStore.email" variant="outlined" label="Email" outlined
                  required></v-text-field>
                <div class="d-flex justify-space-between pb-4">
                  <v-btn @click="$router.push({name : 'login'})" color="#299FFF" rounded variant="outlined" class="w-25">Voltar</v-btn>
                  <v-btn :disabled="!recuperarSenhaStore.email" type="submit" color="#299FFF" rounded class="w-25">Enviar</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container></template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
import { userecuperarSenha } from '../../stores';
import useNotification from '../../stores/notification';
import { ref } from 'vue';
  
  const recuperarSenhaStore = userecuperarSenha();
  const notificator = useNotification();
  const router = useRouter()
  const loading = ref(false);
  
  const enviarEmail = async () => {
    loading.value = true;
    try {
      await recuperarSenhaStore.enviarEmail()
      notificator.notifySuccess("Sucesso ao enviar o email")
      router.push({name: 'conferirToken'})
    } catch (error) {
      notificator.notifyError("Erro ao enviar o e-mail, favor verificar o e-mail.");
    } finally {
      loading.value = false;
    }
  }
  
  </script>