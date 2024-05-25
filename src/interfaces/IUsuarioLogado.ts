export default interface IUsuarioLogado {
    email: string,
    nomeUsuario: string,
    id: number,
    senha: string,
    token: string,
    matricula: string
    autorizacoes: []
}
