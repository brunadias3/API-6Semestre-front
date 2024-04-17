<template>
    <v-app>
        <v-main>
            <v-container>
                <TitleComponent title="Gerenciamento de Departamentos" />
                <TabelaComponent titulo="Departamentos" :headers="headers" :desserts="registroRedzone.dadosRedzone"
                    adicionar="Criar departamento" rota="criarDepartamento" rotaEditar="editarDepartamento"
                    :desativar="desativar" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TabelaComponent from '../TabelaComponent.vue';
import TitleComponent from '../TitleComponent.vue';
import { departamentoStore, registroRedzoneStore } from '../../stores';

const registroRedzone = registroRedzoneStore()
const departamentoStoreDados = departamentoStore();

const headers = [
    { title: 'Id', value: 'id' },
    { title: 'Dia', value: 'data' },
    { title: 'Lotação atual', value: 'lotacaoAtual' },
    { title: 'Entrada/Saida', value: 'entrada' },
    { title: 'Desativar', value: 'desativar' },
    { title: 'Editar', value: 'editar' }


]
const desativar = (id: number) => {
    try {
        departamentoStoreDados.desativarDepartamento(id)
    } catch (error) {
        console.log(error);

    }
    console.log(id);

}
const pegarDados = async () => {
    await registroRedzone.pegarHistoricoRedZone()
}

onMounted(() => {
    pegarDados()
})
</script>