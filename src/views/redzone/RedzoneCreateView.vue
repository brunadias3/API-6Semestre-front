<template>
  <v-container>
    <v-row justify="center" class="pb-5">
      <v-card elevation="7" min-width="800">
        <v-card-title class="text-center" style="color: #3F51B5;">Criar Redzone</v-card-title>
        <v-card-text>
          <v-form @click="salvar()">
            <v-row>
              <v-col cols="6">
                <v-col cols="12">
                  <h1 class="text-subtitle-1" style="color: #3F51B5;">Nome:</h1>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-text-field variant="outlined" rounded v-model="form.nome"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <h1 class="text-subtitle-1" style="color: #3F51B5;">Lotação:</h1>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-text-field variant="outlined" rounded v-model="form.lotacao"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <h1 class="text-subtitle-1" style="color: #3F51B5;">URL da Câmera:</h1>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-text-field variant="outlined" rounded v-model="form.urlCamera"></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <h1 class="text-subtitle-1" style="color: #3F51B5;">Departamento:</h1>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-select v-model="form.departamento" :items="departamentos" variant="outlined" rounded></v-select>
                </v-col>
                <v-col cols="12">
                  <h1 class="text-subtitle-1" style="color: #3F51B5;">Responsável:</h1>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-select v-model="form.responsavel" :items="responsaveis" variant="outlined" rounded></v-select>
                </v-col>
              </v-col>
            </v-row>
            <v-row justify="center" class="pb-2">
              <v-btn color="red-darken-1" variant="outlined" rounded @click="cancelar">Cancelar</v-btn>
              <v-btn class="mx-4" color="blue" rounded @click="salvar">Salvar</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useNotification from '../../stores/notification';

const form = ref({
  nome: '',
  lotacao: '',
  urlCamera: '',
  departamento: null,
  responsavel: null,
});

const departamentos = [
  'Departamento 1',
  'Departamento 2',
  'Departamento 3',
];

const responsaveis = [
  'Responsável 1',
  'Responsável 2',
  'Responsável 3',
];

const cancelar = () => {

};

const notificator = useNotification()
const salvar = () => {
  notificator.notifySuccess('Sucesso ao cadastrar redzone')
};
</script>
