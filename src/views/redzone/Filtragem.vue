<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
  </v-overlay>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-select v-model="redzoneSelected" :items="redzones" item-title="nome_redzone" item-value="id_redzone" variant="outlined" label="Selecione uma redzone"></v-select>
      </v-col>
      <v-col cols="5">
        <VueDatePicker v-model="date" range></VueDatePicker>
      </v-col>
      <v-col class="justify-end">
        <v-btn color="blue" :disabled="!redzoneSelected || !isValidDateRange" @click="searchLogs">Pesquisar</v-btn>
      </v-col>
    </v-row>

    <v-card v-if="logs.length > 0" class="white">
      <v-row>
        <v-col cols="12">
          <v-data-table :items="logs" :headers="headers" :search="search" :loading="loading" loading-text="Pesquisando logs no período selecionado..." no-data-text="Não há registros" no-results-text="Nenhum registro atende à busca" export-name="Logs" items-per-page-text="Itens por página">
            <template #top>
              <v-row justify="center">
                <v-col class="px-10">
                  <p >os botao vai ficar aqui</p>
                </v-col>
              </v-row>
            </template>
            <template #item.lotacao="{ item }">
              <td>
                <v-chip >
                  {{ item.lotacao }}
                </v-chip>
              </td>
            </template>
            <template v-slot:item.entradaAsString="{ item }">
              <v-chip :color="item.entradaAsString === 'Saida' ? '#3B82F6' : '#F6893D'"
                class="text-uppercase" size="small" label>{{item.entradaAsString}}</v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { RedzoneStore } from '../../stores';
import { Redzone } from '../../types/IRedzone';
import useNotification from '../../stores/notification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { IregistroRedzone } from '../../interfaces/IRedzoneRegistro';

const redzoneService = RedzoneStore();
const loading = ref(false);
const redzones = ref<Redzone[]>([]);
const logs = ref<IregistroRedzone[]>([]);
const notificator = useNotification();
const redzoneSelected = ref<string | null>(null);
const date = ref<Date[]>();
const search = ref('');

const isValidDateRange = computed(() => {
  return Array.isArray(date.value) && date.value.length === 2 && date.value[0] < date.value[1];
});

const searchLogs = async () => {
  loading.value = true;
  try {
    if (isValidDateRange.value) {
      const startDate = date.value![0].toISOString().split('.')[0];
      const endDate = date.value![1].toISOString().split('.')[0];
      const response = await redzoneService.getRedzoneDates(redzoneSelected.value!, startDate, endDate);
      logs.value = response.data.map((log: any) => ({
        id: log.id,
        data: log.data,
        lotacao: log.lotacao,
        entradaAsString: log.entrada ? 'Entrada' : 'Saída',
        redzoneNome: log.redzoneId.nome_redzone
      }));
    } else {
      notificator.notifyError('Por favor, selecione um intervalo de datas válido.');
    }
  } catch (error) {
    console.error(error);
    notificator.notifyError('Erro ao buscar logs');
  } finally {
    loading.value = false;
  }
}

const getAll = async () => {
  loading.value = true;
  try {
    const response = await redzoneService.getAll();
    redzones.value = response.data;
  } catch (error) {
    console.error(error);
    notificator.notifyError('Erro ao carregar redzones');
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getAll();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 15);
  const endDate = new Date();
  date.value = [startDate, endDate];
});

const headers = [
  { title: 'ID do Log', value: 'id' },
  { title: 'Data', value: 'data' },
  { title: 'Lotação Atual', value: 'lotacao' },
  { title: 'Tipo de Entrada', value: 'entradaAsString' },
  { title: 'Redzone', value: 'redzoneNome' }
];
</script>
