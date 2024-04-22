interface IdResponsavel {
    id_usuario: string | null | undefined
}

export default interface INovoDepartamento {
    nome_departamento: string,
    responsavel_id: IdResponsavel
}