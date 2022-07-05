import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"
import PlaceOrder from "../../src/application/PlaceOrder"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import Coupon from "../../src/domain/entity/Coupon"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"


let connection: Connection
let orderRepository: OrderRepository

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    orderRepository = new OrderRepositoryDatabase(connection)
    await orderRepository.clear()
})


test("Should be a order", async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ]
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
})
test("Should be a order with discount", async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ],
        coupon: 'VALE20',
        date: new Date("2021-03-01T10:00:00")
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5132)
})

test("Should be a order and generate order code", async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ],
        date: new Date('2021-03-10T10:00:00')
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202100000001')
})

afterEach(async () => {
    await connection.close()
})