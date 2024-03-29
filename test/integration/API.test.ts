import axios from "axios"
import PlaceOrder from "../../src/application/PlaceOrder"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import MemoryQueueAdapter from "../../src/infra/queue/MemoryQueueAdapter"
import Queue from "../../src/infra/queue/Queue"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

let connection: Connection
let orderRepository: OrderRepository
let repositoryFactory: RepositoryFactory
let queue: Queue

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clear()
    queue = new MemoryQueueAdapter()
})

test.skip('Should be call /items', async () => {
    const response = await axios({
        url: 'http://localhost:3000/items',
        method: 'get'
    })
    const items = response.data
    expect(items).toHaveLength(3)
})

test.skip('Should be call /orders', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const placeOrder = new PlaceOrder(repositoryFactory, queue)
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
    await placeOrder.execute(input)

    const response = await axios({
        url: 'http://localhost:3000/orders',
        method: 'get'
    })
    const orders = response.data
    expect(orders).toHaveLength(1)
})

test.skip('Should be call /orders/code', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const placeOrder = new PlaceOrder(repositoryFactory, queue)

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
    await placeOrder.execute(input)

    const response = await axios({
        url: 'http://localhost:3000/orders/202100000001',
        method: 'get'
    })
    const order = response.data
    expect(order.total).toBe(5132)
})

afterEach(async () => {
    await connection.close()
})