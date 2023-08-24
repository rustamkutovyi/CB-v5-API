import { expect } from 'chai'

console.log('reading example spec')

describe('First test', function () {
  it('check sum function', function () {
    let a = 234543434352345
    expect(a + a).to.eq(a * 2)
    expect(1 + 1).to.eq(2)
  })
  it('check mult function', function () {
    expect(5 * 1).to.eq(5)
  })
  after(() => {
    console.log('After hook')
  })
  afterEach(() => {
    console.log('After each hook')
  })
})
console.log('reading done')

describe('second test', function () {
  it('check string length', function () {
    const str = 'Hello'
    const result = str.length
    expect(result).to.eq(5)
  })
})
