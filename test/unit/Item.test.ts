import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"

test('Should return a correct value of item volume', () => {
    const dimensionsItem = new Dimension(100, 30, 10)
    const item = new Item(1, 'Guitarra', 1000, 3, dimensionsItem)
    expect(item.getVolume()).toBe(0.03)
})

test('Should return a correct value of item density', () => {
    const dimensionsItem = new Dimension(100, 30, 10)
    const item = new Item(1, 'Guitarra', 1000, 3, dimensionsItem)
    expect(item.getDensity()).toBe(100)
})

test('Volume should be zero if item not dimension', () => {
    const item = new Item(1, 'Guitarra', 1000, 3)
    expect(item.getDensity()).toBe(0)
})

test('Density should be zero if item not weight', () => {
    const dimensionsItem = new Dimension(100, 30, 10)
    const item = new Item(1, 'Guitarra', 1000)
    expect(item.getDensity()).toBe(0)
})