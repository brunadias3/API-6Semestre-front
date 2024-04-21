import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { AxiosError } from "axios";

const DepartamentoStore = defineStore('departamento', () => {

  async function getAll() {
    try {
      const res = await getRequest('departamentos');
      return { data: res.data, error: null };
    } catch (error: unknown) {
      throw new Error((error instanceof AxiosError ? error.response?.data.error : null) || error);
    }
  }

  return {
    getAll,
  };
});

export default DepartamentoStore;
