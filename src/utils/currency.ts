export const formatPrice = (
  amount: number | string,
  currencyCode: string = 'EUR',
) => {
  const price = Number(amount).toFixed(2);

  const numberFormat = new Intl.NumberFormat([currencyCode], {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  });

  if (isNaN(parseFloat(price))) {
    console.log('price is not a number', amount, currencyCode, price);
    return '0.00';
  }

  return numberFormat.format(+price);
};
