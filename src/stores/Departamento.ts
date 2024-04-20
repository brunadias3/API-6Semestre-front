import { defineStore } from "pinia";
import { ref } from "vue";
import { getRequest, postRequest, putRequest } from "../utils/services/axios";
import IDepartamento from "../interfaces/IDepartamento";


const departamentoStore = defineStore('departamento', () => {
    const departamento = ref<IDepartamento[]>([])
    const errorCatch = ref<unknown>(undefined);


    const getDepartamento = async () => {
        try {
            const response = await getRequest('departamentos')

            departamento.value = response.data
        } catch (error) {
            errorCatch.value = error;
        }
    }


    return {
        departamento,
        getDepartamento,
       
    }
})

export default departamentoStore