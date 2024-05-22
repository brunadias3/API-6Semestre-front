<template>
    <v-overlay :model-value="loading" class="align-center justify-center">
        <v-progress-circular v-model="loading" color="primary" size="64" width="5" indeterminate />
    </v-overlay>
    <v-container v-if="!validador">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card elevation="16" class="mt-16">
                    <v-card-title class="text-center text-light-blue-darken-4">Conferir Token</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="enviarToken">
                            <v-text-field v-model="recuperarSenhaStore.token" variant="outlined" label="Token" outlined
                                required></v-text-field>
                            <div class="d-flex justify-space-between pb-4">
                                <v-btn @click="$router.push({ name: 'login' })" color="#299FFF" rounded
                                    variant="outlined" class="w-25">Voltar</v-btn>
                                <v-btn :disabled="!recuperarSenhaStore.email" type="submit" color="#299FFF" rounded
                                    class="w-25">Enviar</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card elevation="16" class="mt-16">
                    <v-card-title class="text-center text-light-blue-darken-4">Conferir Token</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="trocarSenha">
                            <v-text-field class="mb-4" v-model="recuperarSenhaStore.senhaNova" variant="outlined"
                                type="password" hide-details="auto" label="Senha" />
                            <v-text-field class="mb-4" v-model="recuperarSenhaStore.confirmaSenha" variant="outlined"
                                type="password" hide-details="auto" label="Confirma senha" />
                            <div class="d-flex justify-space-between pb-4">
                                <v-btn @click="$router.push({ name: 'login' })" color="#299FFF" rounded
                                    variant="outlined" class="w-25">Voltar</v-btn>
                                <v-btn :disabled="!recuperarSenhaStore.senhaNova && recuperarSenhaStore.confirmaSenha"
                                    type="submit" color="#299FFF" rounded class="w-25">Enviar</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { userecuperarSenha } from '../../stores';
import useNotification from '../../stores/notification';
import { onMounted, ref } from 'vue';

const recuperarSenhaStore = userecuperarSenha();
const notificator = useNotification();
const router = useRouter()
const validador = ref(false)
const loading = ref(false);

const enviarToken = async () => {
    loading.value = true;

    try {
        await recuperarSenhaStore.enviarToken()
        notificator.notifySuccess("Token correto.")
        validador.value = true;
    } catch (error) {        
        notificator.notifyError("Token inválido.");
        validador.value = false;
    } finally {
        loading.value = false;
    }
}
const trocarSenha = async () => {

    try {
        loading.value = true;
        if (recuperarSenhaStore.senhaNova !== recuperarSenhaStore.confirmaSenha) {
            notificator.notifyError("As senhas tem que ser iguais.")
        }
        if (recuperarSenhaStore.senhaNova.length <= 6 || recuperarSenhaStore.confirmaSenha.length <= 6) {
            notificator.notifyError("As senhas tem que ser maior que 6 digitos")
        }
        else {
            await recuperarSenhaStore.trocarSenha();
            notificator.notifySuccess("Senha alterda com sucesso!.")
            recuperarSenhaStore.senhaNova = ''
            recuperarSenhaStore.confirmaSenha = ''
            recuperarSenhaStore.email = ''
            recuperarSenhaStore.token = ''
            router.push({ name: 'login' });
        }
    } catch (error) {
        notificator.notifyError("Algo deu errado verificar a senha.")
    } finally {
        loading.value = false;
    }

}

onMounted(() => {
    if (!recuperarSenhaStore.email) {
        notificator.notifyWarning("Favor Enviar o e-mail novamente")
        router.push({ name: 'recuperarSenha' });
    }
})

</script>