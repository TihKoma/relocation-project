import {
  addDays,
  addHours,
  addMilliseconds,
  addMinutes,
  format,
} from 'date-fns'

import { timePassed } from './time-passed'

let now: Date

describe('getTimePassed', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime())
    now = new Date()
  })

  it('should be now', () => {
    expect(timePassed(addMilliseconds(now, -50))).toBe('now')
  })

  it('should be on minutes', () => {
    expect(timePassed(addMinutes(now, -3))).toBe('3m')
  })

  it('should be on hours', () => {
    expect(timePassed(addHours(now, -5))).toBe('5h')
  })

  it('should be on days', () => {
    expect(timePassed(addDays(now, -6))).toBe('6d')
  })

  it('should be a current date', () => {
    const currentDate = addDays(now, -10)
    expect(timePassed(currentDate)).toBe(format(currentDate, 'd LLL'))
  })
})
