export const move = function <T>(
  arr: Array<T>,
  from: number,
  to: number,
): Array<T> {
  const newArr = [...arr]
  newArr.splice(from, 1, newArr.splice(to, 1, newArr[from])[0])
  return newArr
}
