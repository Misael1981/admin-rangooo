export function formatCurrencyForInt(value: number) {
  const realAmount = value / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(realAmount);
}
