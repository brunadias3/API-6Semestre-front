<template>
    <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="8" md="6">
            <v-card :title="editar ? 'Editar departamento' : 'Criar departamento'" class="text-light-blue-darken-4"
                elevation="10">
                <div class="w-75 mx-auto">
                    <v-text-field class="mb-4" v-model="nomeDepartamento" variant="outlined" hide-details="auto"
                        label="Nome do departamento" @input="enviarNomeDepartamento" />

                    <v-select v-model="nomeResponsavelModel" variant="outlined" label="Selecione um responsável"
                        :items="responsaveis" item-title="nomeResponsavel" item-value="idResponsavel">
                    </v-select>

                    <div class="d-flex justify-space-between pb-4">
                        <v-btn color="#299FFF" rounded variant="outlined" class="w-25"
                            @click="props.funcaoVoltar">voltar</v-btn>
                        <v-btn @click="props.funcao" :disabled="!nomeDepartamento || !nomeResponsavelModel"
                            type="submit" color="#299FFF" rounded class="w-25">{{ editar ? 'Salvar' : 'Criar' }}</v-btn>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['nomeDepartamento', 'nomeResponsavel']);



const props = defineProps<{
    rota: string;
    funcao: () => {};
    funcaoVoltar: () => void;
    editar: boolean
    nomeDepartamento?: string;
    nomeResponsavelModel?: string | null;

}>();
const responsaveis = ref([
    { nomeResponsavel: 'Responsável 1', idResponsavel: 5 },
    { nomeResponsavel: 'Responsável 2', idResponsavel: '2' },
    { nomeResponsavel: 'Responsável 3', idResponsavel: '3 '},
]);
const nomeDepartamento = ref(props.nomeDepartamento);
const nomeResponsavelModel = ref(props.nomeResponsavelModel);

const enviarNomeDepartamento = () => {
    emit('nomeDepartamento', nomeDepartamento.value);
};


watch(nomeResponsavelModel, (newValue, oldValue) => {
    emit('nomeResponsavel', newValue);
});


</script>
