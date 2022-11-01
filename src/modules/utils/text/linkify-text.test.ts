import { getMatchInPosition } from '@/modules/utils/text/linkify-text'

import { linkifyText } from './linkify-text'

it('text', () => {
  expect(linkifyText('one two   three')).toEqual(['one two   three'])
})

it('link', () => {
  expect(linkifyText('http://example.com')).toEqual([
    {
      schema: 'http:',
      index: 0,
      lastIndex: 18,
      raw: 'http://example.com',
      text: 'http://example.com',
      url: 'http://example.com',
    },
  ])
  expect(linkifyText('https://example.ru')).toEqual([
    {
      schema: 'https:',
      index: 0,
      lastIndex: 18,
      raw: 'https://example.ru',
      text: 'https://example.ru',
      url: 'https://example.ru',
    },
  ])
  expect(linkifyText('www.example.net')).toEqual([
    {
      schema: '',
      index: 0,
      lastIndex: 15,
      raw: 'www.example.net',
      text: 'www.example.net',
      url: 'http://www.example.net',
    },
  ])
  expect(linkifyText('https://www.example.io?foo=bar#anchor')).toEqual([
    {
      schema: 'https:',
      index: 0,
      lastIndex: 37,
      raw: 'https://www.example.io?foo=bar#anchor',
      text: 'https://www.example.io?foo=bar#anchor',
      url: 'https://www.example.io?foo=bar#anchor',
    },
  ])
  expect(linkifyText('example.com')).toEqual([
    {
      schema: '',
      index: 0,
      lastIndex: 11,
      raw: 'example.com',
      text: 'example.com',
      url: 'http://example.com',
    },
  ])
})

it('hashtag', () => {
  expect(linkifyText('#hashtag')).toEqual([
    {
      schema: '#',
      index: 0,
      lastIndex: 8,
      raw: '#hashtag',
      text: '#hashtag',
      url: '/tag/hashtag',
    },
  ])
})

it('email', () => {
  expect(linkifyText('example.mail@gmail.com')).toEqual([
    {
      schema: 'mailto:',
      index: 0,
      lastIndex: 22,
      raw: 'example.mail@gmail.com',
      text: 'example.mail@gmail.com',
      url: 'mailto:example.mail@gmail.com',
    },
  ])
})

it('mixed', () => {
  expect(
    linkifyText(
      'text  text?! #hashtag example-link.com?foo=bar text http://example.ru#anchor #hashtag#hashtag example@gmail.com',
    ),
  ).toEqual([
    'text  text?! ',
    {
      schema: '#',
      index: 13,
      lastIndex: 21,
      raw: '#hashtag',
      text: '#hashtag',
      url: '/tag/hashtag',
    },
    ' ',
    {
      schema: '',
      index: 22,
      lastIndex: 46,
      raw: 'example-link.com?foo=bar',
      text: 'example-link.com?foo=bar',
      url: 'http://example-link.com?foo=bar',
    },
    ' text ',
    {
      schema: 'http:',
      index: 52,
      lastIndex: 76,
      raw: 'http://example.ru#anchor',
      text: 'http://example.ru#anchor',
      url: 'http://example.ru#anchor',
    },
    ' ',
    {
      schema: '#',
      index: 77,
      lastIndex: 85,
      raw: '#hashtag',
      text: '#hashtag',
      url: '/tag/hashtag',
    },
    {
      schema: '#',
      index: 85,
      lastIndex: 93,
      raw: '#hashtag',
      text: '#hashtag',
      url: '/tag/hashtag',
    },
    ' ',
    {
      schema: 'mailto:',
      index: 94,
      lastIndex: 111,
      raw: 'example@gmail.com',
      text: 'example@gmail.com',
      url: 'mailto:example@gmail.com',
    },
  ])
})

it('matchOnPosition', () => {
  const text =
    'text https://link.com text #hashtag1#hashtag2 text email@gmail.com'
  expect(getMatchInPosition(text, 2)).toEqual(null)
  expect(getMatchInPosition(text, 8)).toEqual({
    schema: 'https:',
    index: 5,
    lastIndex: 21,
    raw: 'https://link.com',
    text: 'https://link.com',
    url: 'https://link.com',
  })
  expect(getMatchInPosition(text, 32)).toEqual({
    schema: '#',
    index: 27,
    lastIndex: 36,
    raw: '#hashtag1',
    text: '#hashtag1',
    url: '/tag/hashtag1',
  })
  expect(getMatchInPosition(text, 64)).toEqual({
    schema: 'mailto:',
    index: 51,
    lastIndex: 66,
    raw: 'email@gmail.com',
    text: 'email@gmail.com',
    url: 'mailto:email@gmail.com',
  })
})
