<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
  </v-overlay>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="16" class="mt-16">
          <v-card-title class="text-center text-light-blue-darken-4">LOGIN</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginUsuario">
              <v-text-field v-model="loginService.bodyLogin.email" variant="outlined" label="Email" outlined
                required></v-text-field>
              <v-text-field v-model="loginService.bodyLogin.senha" variant="outlined" label="Senha" type="password"
                outlined required></v-text-field>
              <div @click="recuperarSenha" class="text-right font-bold text-light-blue-darken-4 mb-2 cursor-pointer">
                Esqueci minha senha
              </div>
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useNotification from '../../stores/notification';
import LoginStore from '../../stores/Login';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import handleLocalStorage from '../../utils/handleLocalStorage';
import IUsuarioLogado from '../../interfaces/IUsuarioLogado';


const loginService = LoginStore();
const notificator = useNotification();
const router = useRouter();
const loading = ref(false);

const loginUsuario = async () => {
  if (loginService.bodyLogin.email === '' && loginService.bodyLogin.senha === '') {
    notificator.notifyError('Por favor preencha os campos de email e senha.');
  } else {
    loading.value = true
    try {
      await loginService.login()
      router.push({ name: 'usuarios' })
    } catch (error) {
      notificator.notifyError(error.response.data);
    } finally {
      loading.value = false
    }
  }
};

const recuperarSenha = () => {
  return router.push({ name: 'recuperarSenha' })
}

onMounted(() => {
  loginService.usuarioLogado = handleLocalStorage.get('usuarioLogado') as IUsuarioLogado
  if (loginService.usuarioLogado) {
    router.push({ name: 'usuarios' })
  }
  loginService.bodyLogin = { email: '', senha: '' }
})
</script>