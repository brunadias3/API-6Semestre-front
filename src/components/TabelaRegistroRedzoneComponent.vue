<template>
  <v-container>
    <v-card title="Tabela de registros" class="text-light-blue-darken-4 mx-auto ml-10" elevation="10">
      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi mdi-magnify" variant="outlined"
          hide-details single-line></v-text-field>
      </template>
      <v-data-table items-per-page-text="Itens por página" no-data-text="Não possui nenhum registro."  :headers="headers" :items="desserts"  item-key="id" :items-per-page="5" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td v-if="item.redzone">
              {{ item.redzone }}
            </td>
            <td>{{ formatarData(item.data) }}</td>
            <td>
              <v-chip v-if="item.lotacaoMaxima" variant="tonal"
                :color="item.lotacaoAtual > item.lotacaoMaxima ? 'red' : 'green'">
                {{ item.lotacaoAtual }}
              </v-chip>
              <v-chip v-else>
                {{ item.lotacaoAtual }}
              </v-chip>
            </td>

            <td v-if="item.entrada">
              <v-chip variant="tonal" :color="item.entrada === 'saida' ? '#F6893D' : '#3B82F6'">
                {{ item.entrada }}
              </v-chip>
            </td>

          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Registro {
  id: number;
  entrada: string;
  data: string;
  lotacaoAtual?: number; 
  redzone?: string;
  lotacaoMaxima?: number
}

const search = ref('')
const props = defineProps<{
  headers: { title: string; value: string }[];
  desserts: { registro: Registro[]  }[];
}>();
function formatarData(data: string): string {
  const [ano, mes, diaHora] = data.split('-');
  const [dia, hora] = diaHora.split(' ');

  return `${dia}/${mes}/${ano} ${hora}`;
}
</script>
