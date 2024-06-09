import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { ref } from "vue";
import { IregistroRedzone } from "../interfaces/IRedzoneRegistro";

const registroRedzoneStore = defineStore('registro', () => {
  const dadosRedzone = ref<IregistroRedzone[]>([])
  const dadosAlternativos = ref()
  const logsEntradaSaida = ref()
  const logsGrupo = ref()

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

  const getLogsPerDateGrupo = async (redzoneId: number, startDate: string, endDate: string) => {
    const response = await getRequest(`log/redzone/${redzoneId}/dialogcontar?startDate=${startDate}&endDate=${endDate}`)
    logsGrupo.value = response.data
  }

  const getLogsPerDateRedzoneEntradaSaida = async (redzoneId: number, startDate: string, endDate: string) => {
    const response = await getRequest(`log/gra?redzoneId=${redzoneId}&startDate=${startDate}&endDate=${endDate}`)
    logsEntradaSaida.value = response.data
  }


  return {
    dadosRedzone,
    dadosAlternativos,
    logsGrupo,
    logsEntradaSaida,
    pegarHistorico,
    pegarHistoricoRedZone,
    getRedzoneMaisLog,
    getLogsPerDateGrupo,
    getLogsPerDateRedzoneEntradaSaida
  }
})

export default registroRedzoneStore;
