import React from 'react'

import { composeRefs } from './composeRefs'

describe('composeRefs', () => {
  it('should transfer same ref to all element in array', () => {
    const ref1 = React.createRef()
    const ref2 = React.createRef()
    const actual = {}
    composeRefs([ref1, ref2])(actual)
    expect(ref1.current).toBe(actual)
    expect(ref2.current).toBe(actual)
  })
  it('should take ref object and ref callback', () => {
    const ref1 = React.createRef()
    let result = null
    const ref2 = (ref: any) => (result = ref)
    const actual = {}
    composeRefs([ref1, ref2])(actual)
    expect(ref1.current).toBe(actual)
    expect(result).toBe(actual)
  })
})
