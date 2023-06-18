export default function numberToCurrency(num: number): string {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
