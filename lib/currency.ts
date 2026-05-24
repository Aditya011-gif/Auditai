export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";

export const currencyOptions: Array<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD - US dollar" },
  { code: "INR", label: "INR - Indian rupee" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British pound" }
];

const usdExchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.79
};

export function convertUsd(value: number, currency: CurrencyCode = "USD") {
  return value * usdExchangeRates[currency];
}

export function convertCurrency(value: number, from: CurrencyCode, to: CurrencyCode) {
  const valueInUsd = value / usdExchangeRates[from];
  return Math.round(valueInUsd * usdExchangeRates[to]);
}
