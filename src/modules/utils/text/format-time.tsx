// format time AM PM, example '12:38 AM'
export const formatTime = (date: Date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes() as string | number
  const suffix = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes

  return hours + ':' + minutes + ' ' + suffix
}
