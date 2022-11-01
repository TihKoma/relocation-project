export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), timeout)
  })
}
