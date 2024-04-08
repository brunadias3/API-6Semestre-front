<template>
  <v-container>
    <div class="d-flex justify-end">
      <v-btn @click="$router.push({ name: rota })" v-if="adicionar" color="primary" text class="ma-2">
        {{ adicionar }}
      </v-btn>
    </div>
    <v-card :title="titulo" class="text-light-blue-darken-4 mx-auto ml-10" elevation="10">
      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi mdi-magnify" variant="outlined"
          hide-details single-line></v-text-field>
      </template>
      <v-data-table loading-text="Procurando informações" :loading="isLoading" items-per-page-text="Itens por página"
        no-data-text="Não possui nenhum registro." :headers="headers" :items="desserts" item-key="id"
        :items-per-page="25" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td v-if="item.redzone">
              {{ item.redzone }}
            </td>
            <td>{{ formatarData(item.data) }}</td>
            <td>
              <v-chip v-if="item.lotacaoMaxima" variant="tonal"
                :color="item.lotacao > item.lotacaoMaxima ? 'red' : 'green'">
                {{ item.lotacao }}
              </v-chip>
              <v-chip v-else>
                {{ item.lotacao }}
              </v-chip>
            </td>

            <td v-if="item.entrada">
              <v-chip variant="tonal" class="text-capitalize" :color="item.entrada === 'saida' ? '#F6893D' : '#3B82F6'">
                {{ item.entrada }}
              </v-chip>
            </td>
            <td @click="desativar(item.id)" v-if="headers.some(header => header.value === 'desativar')">
              <v-icon class="cursor-pointer" color="red" aria-hidden="false">
                mdi mdi-sync-off
              </v-icon>
            </td>
            <td @click="editar(item.id)" v-if="headers.some(header => header.value === 'editar')">
              <v-icon class="cursor-pointer" color="#3B82F6" aria-hidden="false">
                mdi mdi-pen
              </v-icon>
            </td>

          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

interface Registro {
  id: number;
  entrada: string;
  data: string;
  lotacao?: number;
  redzone?: string;
  lotacaoMaxima?: number;
}

const search = ref('')
const props = defineProps<{
  headers: { title: string; value: string }[];
  desserts: { registro: Registro[] }[];
  adicionar?: string;
  rota?: string;
  titulo: string;
  isLoading: boolean;
}>();
function formatarData(data: string): string {
  const [ano, mes, diaHora] = data.split('-');
  const [dia, hora] = diaHora.split(' ');

  return `${dia}/${mes}/${ano} ${hora}`;
}

const desativar = (id: number) => {
  console.log(`desativosapoha ${id}`);
}

const editar = (id: number) => {
  console.log(`editandosapoha ${id}`);
}

</script>
