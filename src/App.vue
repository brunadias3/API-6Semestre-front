<template>
  <v-app>
    <v-main >
      <v-container >
        <TabelaRegistroRedzone :headers="headers" :desserts="desserts" />

      </v-container>


    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TabelaRegistroRedzone from './components/TabelaRegistroRedzone.vue';
const headers = [
  { title: 'Id', value: 'id' },
  { title: 'Redzone', value: 'redzone' },
  { title: 'Dia', value: 'dia' },
  { title: 'Lotação atual', value: 'lotacaoAtual' },
]
const desserts = [
  {
    id: 1,
    redzone: 'Almoxarifado',
    lotacaoAtual: 2,
    dia: 'c. 2580–2560 BC',
    lotacaoMaxima: 10
  },
  {
    id: 2,
    redzone: 'Almoxarifado',
    lotacaoAtual: 14,
    dia: 'c. 2570 BC',
    lotacaoMaxima: 10
  },
  {
    id: 3,
    redzone: 'Almoxarifado',
    lotacaoAtual: 12,
    dia: 'c. 2590 BC',
    lotacaoMaxima: 10
  },
  {
    id: 4,
    redzone: 'Cozinha',
    lotacaoAtual: 7,
    dia: 'c. 2600 BC',
    lotacaoMaxima: 8
  },
  {
    id: 5,
    redzone: 'Cozinha',
    lotacaoAtual: 12,
    dia: 'c. 200 CE',
    lotacaoMaxima: 8
  },
  {
    id: 6,
    redzone: 'Cozinha',
    lotacaoAtual: 19,
    dia: 'c. 200 CE',
    lotacaoMaxima: 8
  },
  {
    id: 7,
    redzone: 'Caldeira',
    lotacaoAtual: 5,
    dia: 'c. 200 CE',
    lotacaoMaxima: 13
  },
  {
    id: 8,
    redzone: 'Caldeira',
    lotacaoAtual: 3,
    dia: 'c. 200 CE',
    lotacaoMaxima: 13
  },
]

</script>
