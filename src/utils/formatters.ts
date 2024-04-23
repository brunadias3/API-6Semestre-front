export function obterDataFormatada() {
  const data = new Date();
  const dataFormatada = data.toISOString().slice(0, 19).replace('T', ' ');
  return dataFormatada;
}
