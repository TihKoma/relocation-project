export const nth = (n: number) => {
  let prefix = 'th'
  if (!(11 <= n % 100 && n % 100 <= 13) && 1 <= n % 10 && n % 10 <= 3) {
    prefix = ['st', 'nd', 'rd'][(n % 10) - 1]
  }

  return `${n}${prefix}`
}
