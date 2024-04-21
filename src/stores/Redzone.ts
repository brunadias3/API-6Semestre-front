import { defineStore } from "pinia";
import { getRequest, postRequest } from "../utils/services/axios";
import { AxiosError } from "axios";
import { Redzone } from "../types/IRedzone";

const RedzoneStore = defineStore('redzone', () => {

  async function getAll() {
    try {
      const res = await getRequest('redzones');
      return { data: res.data, error: null };
    } catch (error: unknown) {
      throw new Error((error instanceof AxiosError ? error.response?.data.error : null) || error);
    }
  }

  async function create(redzone: Redzone) {
    try {
      const res = await postRequest('redzones', redzone);
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

export default RedzoneStore;
