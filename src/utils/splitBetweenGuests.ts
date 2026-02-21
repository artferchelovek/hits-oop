export function splitBetweenGuests(amount: number, guests: number): number[] {
  const base = Math.floor((amount / guests) * 100) / 100;
  const result = Array(guests).fill(base);

  const sum = base * guests;
  const diff = +(amount - sum).toFixed(2);

  if (diff > 0) {
    result[0] += diff;
  }

  return result;
}
