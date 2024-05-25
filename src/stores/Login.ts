import { defineStore } from "pinia";
import { ref } from "vue";
import { postRequestLogin } from "../utils/services/axios";
import handleLocalStorage from "../utils/handleLocalStorage";
import IUsuarioLogado from "../interfaces/IUsuarioLogado";



const LoginStore = defineStore('login', () => {
    interface ILogin{
        email: string,
        senha: string
    }

    const bodyLogin = ref<ILogin>({
        email: '',
        senha: ''
    })
    const usuarioLogado = ref<IUsuarioLogado>()

    const login = async () => {
        
        const body = {
            email: bodyLogin.value.email,
            senha: bodyLogin.value.senha
        }
        const response = await postRequestLogin('/login',body);
        handleLocalStorage.set('usuarioLogado', response.data)
        usuarioLogado.value = handleLocalStorage.get('usuarioLogado') as IUsuarioLogado;
    }


    return {
        bodyLogin,
        usuarioLogado,
        login

    }
});

export default LoginStore;