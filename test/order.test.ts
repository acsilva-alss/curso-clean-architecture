import Cpf from "../src/Cpf"
import CpfValidator from "../src/Cpf"
import Item from "../src/Item"
import Order from "../src/Order"
import OrderItem from "../src/OrderItem"

let order: Order

// beforeEach(() =>{
//     const cpfValidator = new CpfValidator()
//     order = new Order(cpfValidator)
// })

test("Should not create an order with an invalid cpf", () => {
    const invalidCpf = '85043122151'
    expect(() => new Order(invalidCpf)).toThrow(new Error("ERROR! Invalid CPF"))
})

test("Should create an order with 3 itens", () => {
    const newItem1 = new Item(0, 'Produto 1', 20)
    const newItem2 = new Item(0, 'Produto 1', 10)
    const newItem3 = new Item(0, 'Produto 1', 10)
    
    const newOrder = new Order('02695041098')
    newOrder.addItem(newItem1, 2)
    newOrder.addItem(newItem2, 1)
    newOrder.addItem(newItem3, 1)
    
    const totalOrder = newOrder.getTotalOrder()
    expect(totalOrder).toBe(60)
})

// test("Should create an order with discount", () => {
//     const invalidCpf = '02695041098'
//     order.addItem('Produto 1', 20.00, 1)
//     const percentDiscount = 0.2
//     order.finishOrder(invalidCpf, percentDiscount)
//     expect(20.00 - (20.00 * 0.2)).toBe(order.totalPrice)
// })