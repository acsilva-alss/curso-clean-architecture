import Coupon from "../src/Coupon"
import Cpf from "../src/Cpf"
import CpfValidator from "../src/Cpf"
import Dimension from "../src/Dimension"
import Item from "../src/Item"
import Order from "../src/Order"
import OrderItem from "../src/OrderItem"

// let order: Order

const fakeValidCpf = '46697564350'
const fakeInvalidCpf = '85043122151'

test("Should not create an order with an invalid cpf", () => {
    expect(() => new Order(fakeInvalidCpf)).toThrow(new Error("ERROR! Invalid CPF"))
})

test("Should create an order with 3 itens", () => {
    const newItem1 = new Item(0, 'Produto 1', 20)
    const newItem2 = new Item(0, 'Produto 1', 10)
    const newItem3 = new Item(0, 'Produto 1', 10)
    
    const newOrder = new Order(fakeValidCpf)
    newOrder.addItem(newItem1, 2)
    newOrder.addItem(newItem2, 1)
    newOrder.addItem(newItem3, 1)
    
    const totalOrder = newOrder.getTotalOrder()
    expect(totalOrder).toBe(60)
})

test("Should create an order with discount", () => {
    const newItem1 = new Item(0, 'Produto 1', 20)
    const newOrder = new Order(fakeValidCpf)
    newOrder.addItem(newItem1, 1)
    const newCoupon = new Coupon('PROMOCAO', 20)
    newOrder.addCoupon(newCoupon)
    expect(newOrder.getTotalOrder()).toBe(newItem1.price - newCoupon.calculateDiscount(newItem1.price))
})

test("Should create an order with expired coupon", () => {
    const order = new Order('935.411.347-80', new Date('2021-03-10T10:00:00'))
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Amplificador", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2021-03-01T10:00:00')))
    const total = order.getTotalOrder()
    expect(total).toBe(6090)
})

test("Should create an order with 3 items and calculate freight", () => {
    const order = new Order('935.411.347-80')
    order.addItem(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)), 1)
    order.addItem(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)), 1)
    order.addItem(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)), 3)
    const freight = order.getFreight()
    const total = order.getTotalOrder()
    expect(total).toBe(6350)
})