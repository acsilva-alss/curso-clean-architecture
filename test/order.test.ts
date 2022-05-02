import Coupon from "../src/Coupon"
import Cpf from "../src/Cpf"
import CpfValidator from "../src/Cpf"
import Item from "../src/Item"
import Order from "../src/Order"
import OrderItem from "../src/OrderItem"

let order: Order

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