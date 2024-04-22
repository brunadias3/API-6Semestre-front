import { defineStore } from "pinia";
import { ref } from "vue";
import { deleteRequest, getRequest, postRequest } from "../utils/services/axios";
import IDepartamento from "../interfaces/IDepartamento";
import INovoDepartamento from "../interfaces/INovoDepartamento";


const departamentoStore = defineStore('departamento', () => {
    const departamento = ref<IDepartamento[]>([])
    const errorCatch = ref<unknown>(undefined);
    const novoDepartamento = ref<INovoDepartamento>({} as INovoDepartamento)


    const criarDepartamento = async (departamento: INovoDepartamento) => {
        try {
            const body = {
                nome_departamento: departamento.nome_departamento,
                responsavel_id: {
                    id_usuario: departamento.responsavel_id
                }
            };
            const response = await postRequest('departamentos', body);

            return response.data;
        } catch (error) {
            errorCatch.value = error;
        }
    }

    const getDepartamento = async () => {
        try {
            const response = await getRequest('departamentos')

            departamento.value = response.data.reverse()
        } catch (error) {
            errorCatch.value = error;
        }
    }
    const desativarOuAtivarDepartamento = async (id: string) => {
        try {
            const response = await deleteRequest(`departamentos/${id}`)

           departamento.value = response.data.reverse()
            
        } catch (error) {
            errorCatch.value = error;
        }
    }

    return {
        novoDepartamento,
        departamento,
        getDepartamento,
        criarDepartamento,
        desativarOuAtivarDepartamento
    }
})

export default departamentoStore