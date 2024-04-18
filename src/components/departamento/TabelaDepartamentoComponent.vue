<template>
    <v-app>
        <v-main>
            <v-container>
                <TitleComponent title="Gerenciamento de Departamentos" />
                <TabelaComponent titulo="Departamentos" :headers="headers" :dessertsDepartamento="departamentoStoreDados.departamento"
                    adicionar="Criar departamento" rota="criarDepartamento" rotaEditar="editarDepartamento" />
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TabelaComponent from '../TabelaComponent.vue';
import TitleComponent from '../TitleComponent.vue';
import { departamentoStore } from '../../stores';

const departamentoStoreDados = departamentoStore();

const headers = [
    { title: 'Id do departamento', value: 'id_departamento' },
    { title: 'Nome do departamento', value: 'nome_usuario' },
    { title: 'Criado em', value: 'create_at' },
    { title: 'Nome do Responsável', value: 'nome_responsavel' },
    { title: 'Desativar', value: 'desativar' },
    { title: 'Editar', value: 'editar' }


]
// const desativar = (id: number) => {
//     try {
//         departamentoStoreDados.desativarDepartamento(id)
//     } catch (error) {
//         console.log(error);

//     }
//     console.log(id);

// }
const pegarDados = async () => {
    await departamentoStoreDados.getDepartamento();
}

onMounted(() => {
    pegarDados()
})
</script>