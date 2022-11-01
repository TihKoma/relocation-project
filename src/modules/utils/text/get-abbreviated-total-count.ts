export const getAbbreviatedTotalCount = (count: number) => {
  let i = 0
  while (count >= 1000) {
    count = Math.trunc((count / 1000) * 10) / 10
    i++
  }
  switch (i) {
    case 0:
      return `${count}`
    case 1:
      return `${count}K`
    case 2:
      return `${count}M`

    default:
      return `>999M`
  }
}
