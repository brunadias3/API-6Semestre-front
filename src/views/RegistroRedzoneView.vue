<template>
    <v-app pa-0>
        <v-main>
            <v-container>
                <TitleComponent title="Histórico da redzone" />
                <TabelaComponent :is-loading="isLoading" titulo="Registro da redzone" :headers="headers"
                    :desserts="registroRedzone.dadosRedzone" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import TabelaComponent from '../components/TabelaComponent.vue';
import TitleComponent from '../components/TitleComponent.vue';
import { registroRedzoneStore } from '../stores/index'

const registroRedzone = registroRedzoneStore()
const isLoading = ref(false);

const headers = [
    { title: 'Id', value: 'id', sortable: true },
    { title: 'Dia', value: 'data' },
    { title: 'Lotação atual', value: 'lotacao' },
    { title: 'Entrada/Saida', value: 'entrada' },


]

const pegarDados = async () => {
    isLoading.value = true;
    try {
        await registroRedzone.pegarHistoricoRedZone()
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    pegarDados()
    const intervalId = setInterval(() => {
        pegarDados();
    }, 4000);

    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
</script>
