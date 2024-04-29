import { defineStore } from "pinia";
import { getRequest, postRequest } from "../utils/services/axios";
import { AxiosError } from "axios";
import { Usuario } from "../types/IUsuario";

const UsuarioStore = defineStore('usuario', () => {

  async function getAll() {
    try {
      const res = await getRequest('usuarios');
      return { data: res.data, error: null };
    } catch (error: unknown) {
      throw new Error((error instanceof AxiosError ? error.response?.data.error : null) || error);
    }
  }

  async function create(usuario: Usuario) {
    try {
      const res = await postRequest('/usuarios', usuario);
      return { data: res.data, error: null };
    } catch (error: unknown) {
      throw new Error((error instanceof AxiosError ? error.response?.data.error : null) || error);
    }
  }


  return {
    getAll,
    create
  };
});

export default UsuarioStore;
