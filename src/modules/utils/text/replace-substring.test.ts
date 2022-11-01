import { replaceSubstring } from './replace-substring'

const TEXT_MOCK = 'Hi! Please #help'
it('start', () => {
  expect(replaceSubstring(TEXT_MOCK, 'Bye', [0, 2])).toEqual({
    text: 'Bye! Please #help',
    positions: [0, 3],
  })
})

it('middle', () => {
  expect(replaceSubstring(TEXT_MOCK, 'Thanks for', [4, 10])).toEqual({
    text: 'Hi! Thanks for #help',
    positions: [4, 14],
  })
})

it('end', () => {
  expect(replaceSubstring(TEXT_MOCK, '#thanks', [11, 16])).toEqual({
    text: 'Hi! Please #thanks',
    positions: [11, 18],
  })
})
