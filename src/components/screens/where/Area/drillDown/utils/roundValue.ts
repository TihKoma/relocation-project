export const roundValue = (value: number) => {
  return value >= 1 ? Math.round(value) : 0.99
}
