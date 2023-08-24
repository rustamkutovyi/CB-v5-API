import { expect } from 'chai'

console.log('Reading example spec')

describe('first test', function () {
  before(() => {
    console.log('Before hook')
  })

  beforeEach(() => {
    console.log('Before each hook')
  })

  it('check sum function', function () {
    let a = 2
    expect(a + a).to.eq(a * 2)
  })
  it('check mult function', function () {
    expect(2 * 2).to.eq(4)
  })

  after(() => {
    console.log('After hook')
  })

  afterEach(() => {
    console.log('After each hook')
  })
})
console.log('Reading done')

describe('second test', function () {
  it('check string length', function () {
    const str = 'Hello'
    const result = str.length
    expect(result).to.eq(5)
  })
})
