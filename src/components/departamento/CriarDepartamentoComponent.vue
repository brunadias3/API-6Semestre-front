<template>
    <v-container fluid fill-height>
        <TitleComponent title="Gerenciamento de Departamentos" />

        <CardDepartamento :editar="false" :valorDefault="defaultDepartamento" rota="departamentos"
            :funcao="criarDepartamento" :funcaoVoltar="voltar" @nomeDepartamento="pegarDepartamento"
            @nomeResponsavel="pegarResponsavel" />
    </v-container>
</template>

<script setup lang="ts">
import { departamentoStore } from '../../stores';
import TitleComponent from '../TitleComponent.vue';
import { useRouter } from 'vue-router';
import CardDepartamento from './cardDepartamento.vue';
import { onMounted } from 'vue';
import useNotification from '../../stores/notification';

const notificator = useNotification();
const departamentoStoreDados = departamentoStore();
const router = useRouter()


const defaultDepartamento = {
    nome_departamento: '',
    responsavel_id: { id_usuario: null }
}

const voltar = () => {
    router.push({ name: 'departamentos' });
    departamentoStoreDados.novoDepartamento = { ...defaultDepartamento };

};
const criarDepartamento = async () => {
    try {
        await departamentoStoreDados.criarDepartamento(departamentoStoreDados.novoDepartamento)
        notificator.notifySuccess("Sucesso ao criar departamento!");
    } catch (error) {
        console.log(error);
        notificator.notifyError("Erro ao criar departamento!");
    } finally {
        router.push({ name: 'departamentos' });
    }


}

const pegarDepartamento = (item: string) => {
    departamentoStoreDados.novoDepartamento.nome_departamento = item
}
const pegarResponsavel = (item: string) => {
    departamentoStoreDados.novoDepartamento.responsavel_id.id_usuario = item;
}


onMounted(()=> {
    departamentoStoreDados.novoDepartamento = { ...defaultDepartamento };

})
</script>