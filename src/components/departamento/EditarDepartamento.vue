<template>
    <v-container fluid fill-height>
        <TitleComponent title="Gerenciamento de Departamentos" />

        <CardDepartamento :editar="true" :valorDefault="defaultDepartamento" rota="departamento"
            :funcao="editarDepartamento" :funcaoVoltar="voltar"
            :nome-departamento="departamentoStoreDados.editarDepartamento.nome_departamento"
            :nome-responsavel-model="departamentoStoreDados.editarDepartamento.responsavel_id?.id_usuario"
            @nomeDepartamento="pegarDepartamento" @nomeResponsavel="pegarResponsavel" />
    </v-container>
</template>

<script setup lang="ts">
import { departamentoStore } from '../../stores';
import TitleComponent from '../TitleComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import CardDepartamento from './cardDepartamento.vue';

const departamentoStoreDados = departamentoStore();
const router = useRouter()
const route = useRoute()

const id = route.params.id


const defaultDepartamento = {
    nome_departamento: departamentoStoreDados.editarDepartamento.nome_departamento,
    responsavel_id: { id_usuario: departamentoStoreDados.editarDepartamento.responsavel_id.id_usuario }
}
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
    } catch (error) {
        console.log(error);
    } finally {
        router.push({ name: 'departamentos' });
        departamentoStoreDados.editarDepartamento = { ...defaultDepartamentoVoltar };
    }
}

const pegarDepartamento = (item: string) => {
    departamentoStoreDados.editarDepartamento.nome_departamento = item
}
const pegarResponsavel = (item: string) => {
    departamentoStoreDados.editarDepartamento.responsavel_id.id_usuario = item
}


</script>