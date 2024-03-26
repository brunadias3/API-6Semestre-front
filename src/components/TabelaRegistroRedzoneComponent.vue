<template>
  <v-container>
    <v-data-table :headers="headers" :items="desserts" item-key="id" :items-per-page="5" density="compact">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td v-if="item.redzone">
            {{ item.redzone }}
          </td>
          <td>{{ item.dia }}</td>
          <td>
            <v-chip variant="tonal" :color="item.lotacaoAtual > item.lotacaoMaxima ? 'red' : 'green'">
              {{ item.lotacaoAtual }}
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps<{
  headers: { title: string; value: string }[];
  desserts: { id: number; redzone?: string; lotacaoAtual: number; dia: string, lotacaoMaxima: number }[];
}>();

</script>
