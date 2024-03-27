<template>
    <v-app pa-0>
        <v-main>
            <v-container>
                <TitleComponent title="Histórico da redzone" />
                    <TabelaRegistroRedzoneComponent :headers="headers" :desserts="desserts" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import TabelaRegistroRedzoneComponent from '../components/TabelaRegistroRedzoneComponent.vue';
import TitleComponent from '../components/TitleComponent.vue';

const headers = [
    { title: 'Id', value: 'id' },
    { title: 'Dia', value: 'dia' },
    { title: 'Entrada/Saida', value: 'entrada' }
]
const desserts = [
    {
        id: 1,
        dia: '2024-02-26 13:36:16',
        lotacaoMaxima: 10,
        entrada: 'Entrada',
    },
    {
        id: 2,
        dia: '2024-03-27 14:36:16',
        lotacaoMaxima: 10,
        entrada: 'Saida',
    },
    {
        id: 3,
        dia: '2024-03-28 12:36:16',
        lotacaoMaxima: 10,
        entrada: 'Entrada'
    },
    {
        id: 4,
        dia: '2024-03-01 11:36:16',
        lotacaoMaxima: 8,
        entrada: 'Saida'
    },
    {
        id: 5,
        dia: '2024-03-02 17:36:16',
        lotacaoMaxima: 8,
        entrada: 'Entrada'
    },
    {
        id: 6,
        dia: '2024-03-13 17:36:16',
        lotacaoMaxima: 8,
        entrada: 'Saida'
    },
    {
        id: 7,
        dia: '2024-03-15 17:36:16',
        lotacaoMaxima: 13,
        entrada: 'Entrada'
    },
    {
        id: 8,
        dia: '2024-03-19 17:36:16',
        lotacaoMaxima: 13,
        entrada: 'Saida'
    },
    {
        id: 9,
        dia: '2024-03-20 17:36:16',
        lotacaoMaxima: 13,
        entrada: 'Entrada'
    },
    {
        id: 10,
        dia: '2024-03-01 17:36:16',
        lotacaoMaxima: 13,
        entrada: 'Saida'
    },
    {
        id: 11,
        dia: '2024-03-26 17:36:16',
        lotacaoMaxima: 13,
        entrada: 'Entrada'
    },
]
</script>