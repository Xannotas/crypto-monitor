import { toRoundValue, trimRemain, formatCost, removeEndZeros } from './helpers'

describe('toRoundValue function', () => {
  test('it should be correct', () => {
    expect(toRoundValue(0)).toBe(0)
    expect(toRoundValue(-123.12)).toBe(0)
    expect(toRoundValue(1)).toBe(1)
    expect(toRoundValue(1.123123)).toBe(1.12)
    expect(toRoundValue(1.1299)).toBe(1.12)
    expect(toRoundValue(100000000.1299)).toBe(100000000.12)
  })
})

describe('trimRemain function', () => {
  test('it should be work with string or number', () => {
    expect(trimRemain(1000, 2, '.')).toBe('1000')
    expect(trimRemain('1000', 2, '.')).toBe('1000')
    expect(trimRemain(1000.123, 2, '.')).toBe('1000.12')
    expect(trimRemain('1000.123', 2, '.')).toBe('1000.12')
  })

  test('it should be empty', () => {
    expect(trimRemain('', 2, '.')).toBe('')
  })

  test('it should be correct', () => {
    expect(trimRemain('10.', 2, '.')).toBe('10.')
    expect(trimRemain('10.123', 1, '.')).toBe('10.1')
    expect(trimRemain('10.123', 10, '.')).toBe('10.123')
  })

  // test('it should be ', () => {
  //   expect(trimRemain('0.0001')).toBe('0')
  // })
})

describe('formatCost function', () => {
  test('it should be work with string or number', () => {
    expect(formatCost('1000', ',')).toBe('1,000')
    expect(formatCost(1000, ',')).toBe('1,000')
    expect(formatCost('1000.123', ',')).toBe('1,000.123')
    expect(formatCost(1000.123, ',')).toBe('1,000.123')
  })

  test('it should be correct', () => {
    expect(formatCost('10000000', ',')).toBe('10,000,000')
    expect(formatCost('123456789', ',')).toBe('123,456,789')
  })
})


describe('formatCost function', () => {
  test('it should be work with string or number', () => {
    expect(removeEndZeros('1000')).toBe('1000')
    expect(removeEndZeros(1000)).toBe('1000')
    expect(removeEndZeros('1000.123')).toBe('1000.123')
    expect(removeEndZeros(1000.123)).toBe('1000.123')
  })
  test('it should be work with string or number', () => {
    expect(removeEndZeros('1000.')).toBe('1000')
    expect(removeEndZeros('1000.0')).toBe('1000')
    expect(removeEndZeros('1000.0000')).toBe('1000')
    expect(removeEndZeros('1000.00001')).toBe('1000.00001')
  })
})