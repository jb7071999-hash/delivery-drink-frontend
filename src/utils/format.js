export function formatBRL(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`
}

export const METODOS_PAGAMENTO = {
  pix: 'Pix',
  cartao: 'Cartão',
  dinheiro: 'Dinheiro',
}

export function resumoItens(itens) {
  return itens.map((i) => `${i.qty}x ${i.name}`).join(' · ')
}
