export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function toBoolea(str: string): Boolean {
  return str.toLowerCase() === "true";
}
