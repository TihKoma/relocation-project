import { useMemo } from 'react'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns'

export const timePassed = (createdDate: Date): string => {
  const now = new Date()
  const hours = differenceInHours(now, createdDate)
  let timePassed = 'now'

  if (hours < 1) {
    const minutes = differenceInMinutes(now, createdDate)

    if (minutes > 1) {
      timePassed = `${minutes}m`
    }
  } else if (hours < 24) {
    timePassed = `${hours}h`
  } else if (hours < 168) {
    const days = differenceInDays(now, createdDate)
    timePassed = `${days}d`
  } else {
    timePassed = format(createdDate, 'd LLL')
  }

  return timePassed
}

export const useTimePassed = (createdAt: string): string => {
  // TODO: add update each 10 sec
  return useMemo(() => timePassed(new Date(createdAt)), [createdAt])
}
