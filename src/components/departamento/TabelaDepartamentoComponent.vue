<template>
    <v-app>
        <v-main>
            <v-container>
                <TitleComponent title="Gerenciamento de Departamentos" />
                <TabelaComponent titulo="Departamentos" :headers="headers"
                    :itensDepartamento="departamentoStoreDados.departamento" adicionar="Criar departamento"
                    rota="criarDepartamento" rotaEditar="editarDepartamento" :desativar="desativarOuAtivar" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import TabelaComponent from '../TabelaComponent.vue';
import TitleComponent from '../TitleComponent.vue';
import { departamentoStore } from '../../stores';

const departamentoStoreDados = departamentoStore();
const isLoading = ref(false);

const headers = [
    { title: 'Id do departamento', value: 'id_departamento' },
    { title: 'Nome do departamento', value: 'nome_usuario' },
    { title: 'Criado em', value: 'create_at' },
    { title: 'Nome do Responsável', value: 'nome_responsavel' },
    { title: 'Ativar/Desativar', value: 'desativar' },
    { title: 'Editar', value: 'editar' }


]
const desativarOuAtivar = async (id: number) => {
    try {
        departamentoStoreDados.desativarOuAtivarDepartamento(id.toString());
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => {
            pegarDados();
        }, 400);
    }

}

const pegarDados = async () => {
    await departamentoStoreDados.getDepartamento();
}

onMounted(() => {
    pegarDados()
})
</script>