import { foo } from '../src/index'

describe('foo()', () => {
  it('returns bar', () => {
    expect(foo()).toEqual('bar')
  })
})
