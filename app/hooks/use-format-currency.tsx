import { useMemo } from "react";

export default function useFormatCurrency(amount: number) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-Us", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  // new Intl.NumberFormat is a js constructor used to format numbers based on a specific locale(country). it can also format as currency using style:currency and for percentage using style:percent
  return useMemo(() => formatCurrency(amount), [amount]);
}
