import { defineStore } from "pinia";
import { ref } from "vue";
import { postRequest, postRequestLogin, putRequestSemToken } from "../utils/services/axios";
import { AxiosError } from "axios";


const useRecuperarSenha = defineStore('useRecuperarSenha', () => {
    const email = ref('')
    const token = ref('');
    const senhaNova = ref('');
    const confirmaSenha = ref('')
    const enviarEmail = async () => { 
        try {
            const response = await postRequestLogin('usuarios/enviar-codigo-verificacao', {email: email.value})
    
            return response;
        } catch (error) {
            throw new Error(
                (error instanceof AxiosError ? error.response?.data.error : null) ||
                error
            );
        }       
    }

    const enviarToken = async () => {
        try {
            const response = await postRequestLogin('usuarios/verificar-codigo-verificacao', { email: email.value, codigo: token.value})
            console.log(response);
            
            return response;
        } catch (error) {
            throw new Error(
                (error instanceof AxiosError ? error.response?.data.error : null) ||
                error
            );
        }
    }
    const trocarSenha = async () => {
        try {
            const response = await putRequestSemToken('usuarios/alterar-senha', { email: email.value, codigo: token.value,novaSenha: confirmaSenha.value})
            console.log(response);
            
            return response;
        } catch (error) {
            throw new Error(
                (error instanceof AxiosError ? error.response?.data.error : null) ||
                error
            );
        }
    }

    return {
        email,
        token,
        senhaNova,
        confirmaSenha,
        enviarEmail,
        enviarToken,
        trocarSenha
    }
});

export default useRecuperarSenha;
