export const formatPrice = (num: number): string => {
  const numString = String(num)
  const newStr = []
  const step = 3
  for (let i = numString.length; i > 0; i -= step) {
    newStr.unshift(numString.slice(Math.max(i - step, 0), i))
  }

  return newStr.join(',')
}
