import Dimension from "../../src/domain/entity/Dimension"

test('Should create dimensions', () => {
    const dimension = new Dimension(100, 30, 10)
    const volume = dimension.getVolume()
    expect(volume).toBe(0.03)
})

test('Should return error if any dimensions is less than zero', () => {
   expect(() => new Dimension(100, 30, -10)).toThrow(new Error('Invalid dimension'))
})