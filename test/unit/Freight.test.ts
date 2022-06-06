import Dimension from "../../src/domain/entity/Dimension"
import Freight from "../../src/domain/entity/Freight"
import Item from "../../src/domain/entity/Item"

test('Should calculate freight', () =>{
    const freight = new Freight()

    freight.addItem(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)), 1)
    freight.addItem(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)), 1)
    freight.addItem(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)), 3)
   
    const total = freight.getTotal()
    expect(total).toBe(260)
})

test('Should calculate freight with min price', () =>{
    const freight = new Freight()
    freight.addItem(new Item(3, "Cabo", 30, 0.9, new Dimension(10, 10, 10)), 1)
   
    const total = freight.getTotal()
    expect(total).toBe(10)
})