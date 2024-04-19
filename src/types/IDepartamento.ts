import { Usuario } from "./IUsuario";

export interface Departamento {
  id_departamento: number,
  nome_departamento: string,
  responsavel_id: Usuario
}
