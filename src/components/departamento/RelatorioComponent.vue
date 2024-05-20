<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
  </v-overlay>
  <v-container>
    <TitleComponent title="Relatórios do departamento" />
    <v-select v-model="selectedItem" :items="items" item-title="texto" item-value="value" label="Tipos de relatório"
      :placeholder="placeholder" variant="outlined"></v-select>
    <v-card v-if="selectedItem === 1" class="white">
      <v-row>
        <v-col cols="12">
          <v-data-table :items="departamentoStoreDados.relatoriosDepartamentos" :headers="headers"
            no-data-text="Não há registros" no-results-text="Nenhum registro atende à busca" export-name="Logs"
            items-per-page-text="Itens por página">
            <template #top>
              <v-row justify="center">
                <v-col class="px-10 py-5">
                  <v-tooltip location="bottom" text="Exportar para XLSX">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" color="light-blue-lighten-2"
                        @click="exportToXlsx(departamentoStoreDados.relatoriosDepartamentos)" rounded="xs" class="mr-3">
                        <v-icon size="x-large" color="white">mdi mdi-file-excel</v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <v-tooltip location="bottom" text="Exportar para CSV">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" color="light-blue-lighten-2" @click="exportToCsv" rounded="xs">
                        <v-icon size="x-large" color="white">mdi mdi-file-delimited</v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </v-col>
              </v-row>
            </template>
            <template #item.lotacao="{ item }">
              <td>
                <v-chip>
                  {{ item.lotacao }}
                </v-chip>
              </td>
            </template>
            <template v-slot:item.entrada="{ item }">
              <v-chip :color="item.entrada === 'Entrada' ? '#3B82F6' : '#F6893D'" class="text-uppercase" size="small"
                label :text="item.entrada === 'Saída' ? 'Saída' : 'Entrada'" />
            </template>
            <template v-slot:item.data="{ item }">
              <span>{{ converterComEspaco(item.data) }}</span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="selectedItem === 2">
      <v-select v-model="redZonesSelecionadas" :items="[...departamentoStoreDados.idRedzonesDepartamento]"
        item-title="nome_redzone" item-value="id_redzone" label="Selecione as redzones" :placeholder="placeholder"
        multiple persistent-hint class="w-50" variant="outlined"></v-select>
      <v-card v-for="(dado, index) in dados" :key="index" class="white mt-5">
        <v-expansion-panels>
          <v-expansion-panel
            v-if="redZonesSelecionadas.includes(departamentoStoreDados.idRedzonesDepartamento[index].id_redzone)"
            :title="departamentoStoreDados.idRedzonesDepartamento[index].nome_redzone">
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12">
                  <v-data-table :items="dado" :headers="headersEspecifico" no-data-text="Não há registros"
                    no-results-text="Nenhum registro atende à busca" export-name="Logs"
                    items-per-page-text="Itens por página">
                    <template #top>
                      <v-row justify="center">
                        <v-col class="px-10 py-5">
                          <v-tooltip location="bottom" text="Exportar para XLSX">
                            <template v-slot:activator="{ props }">
                              <v-btn v-bind="props" color="light-blue-lighten-2" @click="exportToXlsx(dado)"
                                rounded="xs" class="mr-3">
                                <v-icon size="x-large" color="white">mdi mdi-file-excel</v-icon>
                              </v-btn>
                            </template>
                          </v-tooltip>
                          <v-tooltip location="bottom" text="Exportar para CSV">
                            <template v-slot:activator="{ props }">
                              <v-btn v-bind="props" color="light-blue-lighten-2" @click="exportToCsvEspecifico(dado)"
                                rounded="xs">
                                <v-icon size="x-large" color="white">mdi mdi-file-delimited</v-icon>
                              </v-btn>
                            </template>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </template>
                    <template #item.lotacao="{ item }">
                      <td>
                        <v-chip>
                          {{ item.lotacao }}
                        </v-chip>
                      </td>
                    </template>
                    <template v-slot:item.entrada="{ item }">
                      <v-chip :color="item.entrada === 'entrada' ? '#3B82F6' : '#F6893D'" class="text-uppercase"
                        size="small" label :text="item.entrada === 'saida' ? 'Saída' : 'Entrada'" />
                    </template>
                    <template v-slot:item.data="{ item }">
                      <span>{{ converterComEspaco(item.data) }}</span>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
    <div v-if="selectedItem === 3">
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-select v-model="redzoneSelected" :items="departamentoStoreDados.idRedzonesDepartamento"
            item-title="nome_redzone" item-value="id_redzone" variant="outlined"
              label="Selecione uma redzone"></v-select>
          </v-col>
          <v-col cols="5">
            <VueDatePicker v-model="date" range></VueDatePicker>
          </v-col>
          <v-col class="justify-end">
            <v-btn color="blue" :disabled="!redzoneSelected || !isValidDateRange" @click="searchLogs">Pesquisar</v-btn>
          </v-col>
        </v-row>
        <v-card v-if="mostrarCard" class="white">
          <v-row>
            <v-col cols="12">
              <v-data-table :items="dadosPorData" :headers="headersPorData" :search="search" :loading="loading"
                loading-text="Pesquisando logs no período selecionado..." no-data-text="Não há registros"
                no-results-text="Nenhum registro atende à busca" export-name="Logs"
                items-per-page-text="Itens por página">
                <template #top>
                  <v-row justify="center">
                    <v-col class="px-10 py-5">
                      <v-tooltip location="bottom" text="Exportar para XLSX">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" color="light-blue-lighten-2" @click="exportToXlsx(dadosPorData)"
                            rounded="xs" class="mr-3">
                            <v-icon size="x-large" color="white">mdi mdi-file-excel</v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                      <v-tooltip location="bottom" text="Exportar para CSV">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" color="light-blue-lighten-2"
                            @click="exportToCsvEspecifico(dadosPorData)" rounded="xs">
                            <v-icon size="x-large" color="white">mdi mdi-file-delimited</v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </template>
                <template #item.lotacao="{ item }">
                  <td>
                    <v-chip>
                      {{ item.lotacao }}
                    </v-chip>
                  </td>
                </template>
                <template v-slot:item.entradaAsString="{ item }">
                  <v-chip :color="item.entradaAsString === 'Entrada' ? '#3B82F6' : '#F6893D'" class="text-uppercase"
                    size="small" label :text="item.entradaAsString === 'Saida' ? 'Saída' : 'Entrada'" />
                </template>
                <template v-slot:item.data="{ item }">
                  <span>{{ converterComEspaco(item.data) }}</span>
                </template>

              </v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>

  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { departamentoStore, RedzoneStore, registroRedzoneStore } from '../../stores';
import { computed, onMounted, ref } from 'vue';
import * as XLSX from "xlsx";
import useNotification from '../../stores/notification';
import { converterComEspaco } from '../../utils/formatters';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


const notificator = useNotification();
const departamentoStoreDados = departamentoStore();
const registroRedzone = registroRedzoneStore()
const route = useRoute()
const id = route.params.id
const selectedItem = ref(1  )
const items = ref([{ texto: 'Relatório geral', value: 1 }, { texto: 'Relatório específicos das redzones', value: 2 }, { texto: 'Relatório por perido', value: 3 }])
const placeholder = ref('Selecione uma opção')
const redzoneSelected = ref<string | null>(null);
const date = ref<Date[]>();
const redzoneService = RedzoneStore();
const search = ref('');
const loading = ref(false);
const mostrarCard = ref(false)
const redZonesSelecionadas = ref([]);
const dados = ref<any[]>([])
const dadosPorData = ref<IRegistroRedzone[]>([])
const headers = [
  { title: 'ID do Log', value: 'id' },
  { title: 'Data', value: 'data' },
  { title: 'Lotação Atual', value: 'lotacao' },
  { title: 'Tipo de Entrada', value: 'entrada' },
  { title: 'Redzone', value: 'nome_redzone' }
];
const headersEspecifico = [
  { title: 'ID do Log', value: 'id' },
  { title: 'Data', value: 'data' },
  { title: 'Lotação Atual', value: 'lotacao' },
  { title: 'Tipo de Entrada', value: 'entrada' },
];

const headersPorData = [
  { title: 'ID do Log', value: 'id' },
  { title: 'Data', value: 'data' },
  { title: 'Lotação Atual', value: 'lotacao' },
  { title: 'Tipo de Entrada', value: 'entradaAsString' },
  { title: 'Redzone', value: 'redzoneNome' }
];

const pegarRelatorio = async () => {
  await departamentoStoreDados.pegarRelatorioDepartamento(id as string)
}

const pegarIdRedzone = async () => {
  await departamentoStoreDados.pegarIdRedzonesByDepartamento(id as string)
}

const pegarLogs = async () => {
  for (const k in departamentoStoreDados.idRedzonesDepartamento) {
    await registroRedzone.pegarHistoricoRedZone(departamentoStoreDados.idRedzonesDepartamento[k].id_redzone)
    dados.value.push(registroRedzone.dadosRedzone)
  }
  return dados;
}



const isValidDateRange = computed(() => {
  return Array.isArray(date.value) && date.value.length === 2 && date.value[0] < date.value[1];
});
const searchLogs = async () => {
  loading.value = true;
  try {
    if (isValidDateRange.value) {
      const startDate = date.value![0].toISOString().split('.')[0];
      const endDate = date.value![1].toISOString().split('.')[0];
      mostrarCard.value = true
      const response = await redzoneService.getRedzoneDates(redzoneSelected.value!, startDate, endDate);
      dadosPorData.value = response.data.map((log: any) => ({
        id: log.id,
        data: log.data,
        lotacao: log.lotacao,
        entradaAsString: log.entrada ? 'Entrada' : 'Saida',
        redzoneNome: log.redzoneId.nome_redzone
      }));
      notificator.notifySuccess("Sucesso ao buscar logs!")
    } else {
      notificator.notifyError('Por favor, selecione um intervalo de datas válido.');
    }
  } catch (error) {
    notificator.notifyError('Erro ao buscar logs');
  } finally {
    loading.value = false;
  }
}

const exportToXlsx = (dados: any) => {
  const jsonData = dados.map(log => ({ ...log }));
  const ws = XLSX.utils.json_to_sheet(jsonData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Logs');
  XLSX.writeFile(wb, 'logs.xlsx');
  notificator.notifySuccess("Sucesso ao exportar XLSX!")
};

const exportToCsv = () => {
  let csvContent = 'ID do Log,Data,Lotacao Atual,Tipo de Entrada,Redzone\n';
  departamentoStoreDados.relatoriosDepartamentos.forEach(log => {
    csvContent += `${log.id},${converterComEspaco(log.data)},${log.lotacao},${log.entrada},${log.nome_redzone}\n`;
  });
  const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = window.URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.href = csvUrl;
  link.setAttribute('download', 'logs.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notificator.notifySuccess("Sucesso ao exportar CSV!")
};
const exportToCsvEspecifico = (dado: any) => {
  let csvContent = 'ID do Log,Data,Lotacao Atual,Tipo de Entrada\n';
  dado.forEach(log => {
    csvContent += `${log.id},${converterComEspaco(log.data)},${log.lotacao},${log.entrada}\n`;
  });
  const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = window.URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.href = csvUrl;
  link.setAttribute('download', 'logs.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notificator.notifySuccess("Sucesso ao exportar CSV!")
};

onMounted(async () => {
  loading.value = true;

  try {
    pegarRelatorio()
    await pegarIdRedzone()
    await pegarLogs()
    notificator.notifySuccess("Sucesso na importação dos dados")
  } catch (error) {
    notificator.notifyError(error.response.data.message)

  } finally {
    loading.value = false;
  }
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 15);
  const endDate = new Date();
  date.value = [startDate, endDate];
})
</script>