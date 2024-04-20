import { defineStore } from "pinia";
import { ref } from "vue";
import { deleteRequest, getRequest } from "../utils/services/axios";
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
    const desativarOuAtivarDepartamento = async (id: string) => {
        try {
            const response = await deleteRequest(`departamentos/${id}`)

            return response
            
        } catch (error) {
            errorCatch.value = error;
        }
    }

    return {
        departamento,
        getDepartamento,
        desativarOuAtivarDepartamento
    }
})

export default departamentoStore