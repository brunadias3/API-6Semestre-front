<template>
    <v-container fluid fill-height>
        <TitleComponent title="Gerenciamento de Departamentos" />

        <CardDepartamento :editar="true" rota="departamento"
            :funcao="editarDepartamento" :funcaoVoltar="voltar"
            :nome-departamento="departamentoStoreDados.editarDepartamento.nome_departamento"
            :id-responsavel="departamentoStoreDados.editarDepartamento.responsavel_id?.id_usuario"
            @nomeDepartamento="pegarDepartamento" @nome-responsavel="pegarResponsavel" />

    </v-container>
</template>

<script setup lang="ts">
import { departamentoStore } from '../../stores';
import TitleComponent from '../TitleComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import CardDepartamento from './cardDepartamento.vue';
import useNotification from '../../stores/notification';
import { onMounted } from 'vue';

const notificator = useNotification();
const departamentoStoreDados = departamentoStore();
const router = useRouter()
const route = useRoute()
const id = route.params.id



const defaultDepartamentoVoltar = {
    nome_departamento: '',
    responsavel_id: { id_usuario: null }
}

const voltar = () => {
    router.push({ name: 'departamentos' });
    departamentoStoreDados.editarDepartamento = { ...defaultDepartamentoVoltar };

};

const editarDepartamento = async () => {
    try {
        await departamentoStoreDados.alterarDepartamento(id , { id_departamento: id as string ,nome_departamento: departamentoStoreDados.editarDepartamento.nome_departamento, responsavel_id: { id_usuario: departamentoStoreDados.editarDepartamento.responsavel_id.id_usuario } })
        notificator.notifySuccess("Sucesso ao editar departamento!");
        router.push("/departamentos");
        departamentoStoreDados.editarDepartamento = { ...defaultDepartamentoVoltar };
    } catch (error) {
        notificator.notifyError("Erro ao editar departamento!");
    }
}

const pegarDepartamento = (item: string) => {
    departamentoStoreDados.editarDepartamento.nome_departamento = item
}
const pegarResponsavel = (item: string) => {
    
    departamentoStoreDados.editarDepartamento.responsavel_id.id_usuario = item
}
const pegarDepartamentobyID = async () => {
    const id = route.params.id
    await departamentoStoreDados.getDepartamentoById(id as string)
}
 
onMounted(()=> {
    pegarDepartamentobyID()
})
</script>