import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { ref } from "vue";
import { IregistroRedzone } from "../interfaces/IRedzoneRegistro";

const registroRedzoneStore = defineStore('registro', () => {
    const dadosRedzone = ref<IregistroRedzone[]>([])

    const pegarHistoricoRedZone = async () => {
        const response = await getRequest('log')

        dadosRedzone.value = response.data.reverse();
    }


    return {
        dadosRedzone,
        pegarHistoricoRedZone
    }
})

export default registroRedzoneStore;
