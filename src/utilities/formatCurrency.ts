const CURRENCY_FORMATTER = new Intl.NumberFormat("SK", {currency: "EUR", style: "currency", minimumFractionDigits: 2})

export function formatCurrency(price:number) {
  return CURRENCY_FORMATTER.format(price)
}