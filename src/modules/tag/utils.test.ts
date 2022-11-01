import { isTag } from './utils'

describe('isTag', () => {
  it('default', () => {
    expect(isTag('#test')).toBeTruthy()
  })

  it('underscore', () => {
    expect(isTag('#test_test')).toBeTruthy()
    expect(isTag('#test_')).toBeTruthy()
  })

  it('numbers', () => {
    expect(isTag('#test123')).toBeTruthy()
    expect(isTag('#123')).toBeTruthy()
  })

  it('only hash', () => {
    expect(isTag('#')).toBeFalsy()
  })

  it('with dot', () => {
    expect(isTag('#test.')).toBeFalsy()
    expect(isTag('#te.st')).toBeFalsy()
  })

  it('with extra symbols in beginning', () => {
    expect(isTag('test#test')).toBeFalsy()
  })

  it('space', () => {
    expect(isTag('#test test')).toBeFalsy()
  })

  it('signs', () => {
    expect(isTag('#test!')).toBeFalsy()
    expect(isTag('#test,')).toBeFalsy()
    expect(isTag('#test?')).toBeFalsy()
    expect(isTag('#te!st')).toBeFalsy()
    expect(isTag('#t,est')).toBeFalsy()
  })

  it('long', () => {
    expect(
      isTag(
        '#testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
      ),
    ).toBeFalsy()
  })
})
