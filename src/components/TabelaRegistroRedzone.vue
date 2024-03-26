<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th v-for="(title, index) in headers" :key="title.value" class="text-left">
            {{ title.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.id">
          <td>{{ item.id }}</td>
          <td v-if="item.redzone">{{ item.redzone }}</td>
          <td>{{ item.dia }}</td>
          <td>
            <v-chip variant="tonal" :color="item.lotacaoAtual > item.lotacaoMaxima ? 'red' : 'green'">
              {{ item.lotacaoAtual }}
            </v-chip>
            <!-- <v-card class="rounded-pill w-25 text-center" :color="alteraCss(item.lotacaoAtual, item.lotacaoMaxima)"
              variant="tonal">{{ item.lotacaoAtual }}</v-card> -->
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps<{
  headers: { title: string; value: string }[];
  desserts: { id: number; redzone?: string; lotacaoAtual: number; dia: string, lotacaoMaxima: number }[];
}>();


const alteraCss = (lotacaoAtual: number, lotacaoMaxima: number) => {
  if (lotacaoAtual > lotacaoMaxima) {
    return 'red ';
  } else {
    return 'green';
  }
}
</script>
