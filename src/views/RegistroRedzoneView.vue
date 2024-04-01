<template>
    <v-app pa-0>
        <v-main>
            <v-container>
                <TitleComponent title="Histórico da redzone" />
                    <TabelaRegistroRedzoneComponent :headers="headers" :desserts="registroRedzone.dadosRedzone" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TabelaRegistroRedzoneComponent from '../components/TabelaRegistroRedzoneComponent.vue';
import TitleComponent from '../components/TitleComponent.vue';
import {registroRedzoneStore} from '../stores/index'

const registroRedzone = registroRedzoneStore()

const headers = [
    { title: 'Id', value: 'id' },
    { title: 'Dia', value: 'data' },
    {title: 'Lotação atual', value: 'lotacaoAtual'},
    { title: 'Entrada/Saida', value: 'entrada' }
    
]

const pegarDados = async () => {
    await registroRedzone.pegarHistoricoRedZone()
}

onMounted(() => {
    pegarDados()
})
</script>