export function useUtils() {
  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const calculateDiscount = (product: any) => {
    return product.price - product.price * (product.discount / 100);
  };

  return {
    moneyFormat,
    calculateDiscount,
  };
}