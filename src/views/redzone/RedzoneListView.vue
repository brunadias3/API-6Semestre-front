<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn prepend-icon="mdi mdi-plus" rounded variant="tonal" color="blue"
          @click="router.push(`/redzone/create`);">Criar Redzone</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="redzone in redzones" :key="redzone.id_redzone" cols="12" sm="6" md="4" lg="3">
        <v-card class="pa-2" outlined hover>
          <v-card-title class="text-center" style="color: #3f51b5;">{{ redzone.nome_redzone }}</v-card-title>
          <v-row class="py-2">
            <v-divider class="mx-7" />
          </v-row>
          <v-row>
            <v-col class="px-6 pt-1 mb-n5">
              <v-chip variant="tonal" :color="redzone.ativo ? 'primary' : 'red'">{{ redzone.ativo ? 'Ativo' :
                'Desativado' }}</v-chip>
            </v-col>
          </v-row>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <span class="font-weight-bold">Responsável:</span>
                  {{ redzone.responsavel_id.nome_usuario }}
                </v-col>
              </v-row>
              <v-row class="mt-n2">
                <v-col>
                  <span class="font-weight-bold">Capacidade Máxima:</span>
                  {{ redzone.capacidade_maxima }}
                </v-col>
              </v-row>
              <v-row class="mt-n2">
                <v-col>
                  <span class="font-weight-bold">Departamento:</span>
                  {{ redzone.id_departamento.nome_departamento }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-tooltip location="bottom" text="Editar">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" @click="editItem(redzone)" color="primary">mdi mdi-pencil</v-icon>
              </template>
            </v-tooltip>
            <v-tooltip location="bottom" :text="redzone.ativo ? 'Desativar' : 'Ativar'">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" @click="active(redzone)" :color="redzone.ativo ? 'red' : 'green'" v-on="on">
                  {{ redzone.ativo ? 'mdi mdi-sync-off' : 'mdi mdi-sync' }}
                </v-icon>
              </template>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Redzone } from '../../types/IRedzone';
import RedzoneStore from '../../stores/Redzone';

const router = useRouter();

const active = (redzone: Redzone) => {
  redzone.ativo = !redzone.ativo;
  console.log(`Redzone ${redzone.nome_redzone} ativada/desativada:`, redzone.ativo);
}

const editItem = (redzone: Redzone) => {
  console.log("Edit item:", redzone);
}

const service = RedzoneStore();
const loading = ref(false);
const redzones = ref<Redzone[]>([]);

const getAll = async () => {
  loading.value = true;
  try {
    const response = await service.getAll();
    redzones.value = response.data
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getAll();
});
</script>
