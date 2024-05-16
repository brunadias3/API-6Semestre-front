export default interface IUsuarioLogado {
    email: string,
    nomeUsuario: string,
    id: number,
    senha: string,
    token: string,
    autorizacoes: []
}