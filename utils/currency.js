export function toValidEuro(amount) {
  return Number(amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}
