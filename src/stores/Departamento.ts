import { defineStore } from "pinia";
import { ref } from "vue";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/services/axios";
import IDepartamento from "../interfaces/IDepartamento";
import INovoDepartamento from "../interfaces/INovoDepartamento";
import IEditarDepartamento from "../interfaces/IEditarDepartamento";
import { AxiosError } from "axios";
import IRelatorioDepartamento from "../types/IRelatorioDepartamento";


const departamentoStore = defineStore('departamento', () => {
  const departamento = ref<IDepartamento[]>([])
  const errorCatch = ref<unknown>(undefined);
  const novoDepartamento = ref<INovoDepartamento>({} as INovoDepartamento)
  const editarDepartamento = ref<IEditarDepartamento>({} as IEditarDepartamento)
  const relatoriosDepartamentos = ref<IRelatorioDepartamento[]>([])
  const contagemTotal = ref()
  const departamentosMostRedzones = ref()
  interface idRedzone {
    id_redzone: number,
    nome_redzone: string
  }
  const idRedzonesDepartamento = ref<idRedzone[]>([])

  const criarDepartamento = async (departamento: INovoDepartamento) => {
    try {
      const body = {
        nome_departamento: departamento.nome_departamento,
        responsavel_id: departamento.responsavel_id
      };
      const response = await postRequest('departamentos', body);

      return response.data;
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }

  const getDepartamento = async () => {
    try {
      const response = await getRequest('departamentos')

      departamento.value = response.data
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }
  const getDepartamentoByIdUsuario = async (id: number) => {
    try {
      const response = await getRequest(`departamentos/responsavel/${id}`)

      departamento.value = response.data;
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }
  const getDepartamentoById = async (id: string) => {
    try {
      const response = await getRequest(`departamentos/${id}`)

      editarDepartamento.value = response.data
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }

  const alterarDepartamento = async (id: string | string[], departamento: IEditarDepartamento) => {
    try {
      const body = {
        id_departamento: id,
        nome_departamento: departamento.nome_departamento,
        responsavel_id: departamento.responsavel_id
      }
      const response = await putRequest(`departamentos/${id}`, body)

      return response;
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }


  const desativarOuAtivarDepartamento = async (id: string) => {
    try {
      const response = await deleteRequest(`departamentos/${id}`)

      departamento.value = response.data.reverse()

    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }

  const pegarRelatorioDepartamento = async (id: string) => {
    try {
      const response = await getRequest(`registroDepartamento/${id}`)

      relatoriosDepartamentos.value = response.data;
    } catch (error) {
      throw new Error(
        (error instanceof AxiosError ? error.response?.data.error : null) ||
        error
      );
    }
  }
  const pegarIdRedzonesByDepartamento = async (id: string) => {
    const response = await getRequest(`registroDepartamento/idredzone/${id}`);
    idRedzonesDepartamento.value = response.data;
  }

  const getTotalDepartamentos = async () => {
    const response = await getRequest(`departamentos/total`);
    contagemTotal.value = response.data;
  }

  const getDepartamentosMostRedzones = async () => {
    const response = await getRequest(`departamentos/maisredzones`);
    departamentosMostRedzones.value = response.data.nome_departamento;
  }

  return {
    novoDepartamento,
    departamento,
    editarDepartamento,
    relatoriosDepartamentos,
    idRedzonesDepartamento,
    contagemTotal,
    departamentosMostRedzones,
    getDepartamento,
    criarDepartamento,
    desativarOuAtivarDepartamento,
    getDepartamentoById,
    alterarDepartamento,
    pegarRelatorioDepartamento,
    pegarIdRedzonesByDepartamento,
    getDepartamentoByIdUsuario,
    getTotalDepartamentos,
    getDepartamentosMostRedzones
  }
})

export default departamentoStore
