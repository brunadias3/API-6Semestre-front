interface Iregistro {
    id: number,
    entrada: string,
    data: string,
    lotacaoAtual: number
}

export interface IregistroRedzone {
    registro: Iregistro[]
}