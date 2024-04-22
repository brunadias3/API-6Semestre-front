<template>
    <v-container fluid fill-height>
        <TitleComponent title="Gerenciamento de Departamentos" />

        <CardDepartamento :editar="true" :valorDefault="defaultDepartamento" rota="departamento"
            :funcao="editarDepartamento" :funcaoVoltar="voltar" :nome-departamento="departamentoStoreDados.editarDepartamento.nome_departamento"
            :nome-responsavel-model="departamentoStoreDados.editarDepartamento.responsavel_id?.id_usuario" @nomeDepartamento="pegarDepartamento"
            @nomeResponsavel="pegarResponsavel" />
    </v-container>
</template>

<script setup lang="ts">
import { departamentoStore } from '../../stores';
import TitleComponent from '../TitleComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import CardDepartamento from './cardDepartamento.vue';
import { onMounted } from 'vue';

const departamentoStoreDados = departamentoStore();
const router = useRouter()
const route = useRoute()

const id = route.params.id


const defaultDepartamento = {
    nome_departamento: '',
    responsavel_id: {id_usuario: null}
}

const voltar = () => {
    router.push({ name: 'departamentos' });
    departamentoStoreDados.editarDepartamento = { ...defaultDepartamento };

};

const editarDepartamento = async () => {
    // await departamentoStoreDados.editarDepartamento(id)
}
const getDepartamento = async (id: string) => {
    try {
        await departamentoStoreDados.getDepartamentoById(id)
    } catch (error) {
        
    }
}

const pegarDepartamento = (item: string) => {
    departamentoStoreDados.editarDepartamento.nome_departamento = item
}
const pegarResponsavel = (item: string) => {
    departamentoStoreDados.editarDepartamento.responsavel_id.id_usuario = item
}


onMounted(()=> {
    getDepartamento(id as string);
})
</script>