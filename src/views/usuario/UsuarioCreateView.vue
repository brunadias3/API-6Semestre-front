<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
  </v-overlay>
  <v-row justify="center" align="center" class="fill-height ">
    <v-col cols="12" sm="8" md="6">
      <v-card title="Criar usuário" class="text-light-blue-darken-4" elevation="10">
        <div class="w-75 mx-auto">
          <v-text-field class="mb-4" v-model="form.nomeUsuario" variant="outlined" hide-details="auto" label="Nome" />

          <v-text-field class="mb-4" v-model="form.emailUsuario" variant="outlined" type="email" hide-details="auto"
            label="E-mail" />

          <v-text-field class="mb-4" v-model="form.matriculaUsuario" variant="outlined" hide-details="auto"
            label="Matrícula" />

          <v-text-field class="mb-4" v-model="form.senhaUsuario" variant="outlined" type="password" hide-details="auto"
            label="Senha" />
          <v-text-field class="mb-4" v-model="form.confirmSenha" variant="outlined" type="password" hide-details="auto"
            label="Confirma senha" />

          <v-select v-model="form.tipoUsuario" variant="outlined" label="Selecione a função" :items="opcoes"
            item-title="titulo" item-value="value">
          </v-select>

          <div class="d-flex justify-space-between pb-4">
            <v-btn color="#299FFF" rounded variant="outlined" class="w-25"
              @click="router.push('/usuarios')">voltar</v-btn>
            <v-btn @click="criarUsuario()" type="submit" color="#299FFF" rounded class="w-25">{{ "Criar" }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { LoginStore, UsuarioStore } from "../../stores";
import useNotification from "../../stores/notification";
import validator from 'validator';

const router = useRouter();
const loading = ref(false);
const funcoes = [{ titulo: "Gerente Geral", value: "ROLE_ADMIN" }, { titulo: "Gerente de área", value: "ROLE_MANAGER" }, { titulo: "Guarda", value: "ROLE_GUARD" }];
const funcoesArea = [{ titulo: "Guarda", value: "ROLE_GUARD" }];
const notificator = useNotification();
const userService = UsuarioStore();
const loginService = LoginStore();
const opcoes = ref()
const form = ref({
  nomeUsuario: "",
  emailUsuario: "",
  matriculaUsuario: "",
  tipoUsuario: "",
  senhaUsuario: "",
  confirmSenha: ""
});



async function criarUsuario() {
  try {
    if (
      !form.value.emailUsuario ||
      !form.value.matriculaUsuario ||
      !form.value.nomeUsuario ||
      !form.value.tipoUsuario
    ) {
      notificator.notifyWarning("Por favor, preencha todos os campos.");
      return;
    }
    if (form.value.senhaUsuario !== form.value.confirmSenha) {
      notificator.notifyWarning("As senhas tem que ser iguais.");
      return;
    }
    if (!validator.isEmail(form.value.emailUsuario)) {
      notificator.notifyWarning("E-mail inválido!");
      return;
    }

    loading.value = true;
    await userService.create({
      nome_usuario: form.value.nomeUsuario,
      email: form.value.emailUsuario,
      matricula_empresa: form.value.matriculaUsuario,
      tipo_usuario: form.value.tipoUsuario,
      senha: form.value.senhaUsuario
    });

    notificator.notifySuccess("Usuário criado com sucesso!");
    router.push("/usuarios");
  } catch (error) {
    notificator.notifyError("Erro ao criar usuário!");
  } finally {
    loading.value = false;
  }
}

onMounted(()=> {
  opcoes.value = loginService.usuarioLogado?.autorizacoes.includes("ROLE_ADMIN") ? funcoes : funcoesArea

})
</script>