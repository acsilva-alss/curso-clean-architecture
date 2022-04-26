import CpfValidator from "../src/CpfValidator"
import Order from "../src/Order"

let order: Order

beforeEach(() =>{
    const cpfValidator = new CpfValidator()
    order = new Order(cpfValidator)
})

test("Should not create an order with an invalid cpf", () => {
    const invalidCpf = '85043122151'
    order.addItem('Produto 1', 20.00, 1)
    expect(() => order.finishOrder(invalidCpf)).toThrow(new Error("ERROR! cpf is invalid"))
})

test("Should create an order with 3 itens", () => {
    const invalidCpf = '02695041098'
    order.addItem('Produto 1', 20.00, 1)
    order.addItem('Produto 2', 20.00, 1)
    order.addItem('Produto 3', 20.00, 1)
    const resultOrder = order.finishOrder(invalidCpf)
    expect(resultOrder).toBe(order.items)
})

test("Should create an order with discount", () => {
    const invalidCpf = '02695041098'
    order.addItem('Produto 1', 20.00, 1)
    const percentDiscount = 0.2
    order.finishOrder(invalidCpf, percentDiscount)
    expect(20.00 - (20.00 * 0.2)).toBe(order.totalPrice)
})