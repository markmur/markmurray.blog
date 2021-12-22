export const formatPrice = (amount: number, currency: string) => {
  const price = (amount / 100).toFixed(2);
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(+price);
};
