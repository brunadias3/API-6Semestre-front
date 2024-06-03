import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { ref } from "vue";
import { IregistroRedzone } from "../interfaces/IRedzoneRegistro";

const registroRedzoneStore = defineStore('registro', () => {
  const dadosRedzone = ref<IregistroRedzone[]>([])
  const dadosAlternativos = ref()

  const pegarHistorico = async () => {
    const response = await getRequest('log')

    dadosRedzone.value = response.data.reverse();
  }

  const pegarHistoricoRedZone = async (idRedzone: any) => {
    const response = await getRequest(`log/redzone/${idRedzone}`)
    dadosRedzone.value = response.data.reverse();
  }

  const getRedzoneMaisLog = async () => {
    const response = await getRequest(`log/redzonemaislogs`)
    const nome = response.data[0][0].nome_redzone
    const qtde = response.data[0][1]
    dadosAlternativos.value = { nome: nome, qtde: qtde }
  }


  return {
    dadosRedzone,
    dadosAlternativos,
    pegarHistorico,
    pegarHistoricoRedZone,
    getRedzoneMaisLog
  }
})

export default registroRedzoneStore;
