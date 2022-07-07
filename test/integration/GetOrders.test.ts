import GetOrders from "../../src/application/GetOrders"
import PlaceOrder from "../../src/application/PlaceOrder"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

let connection: Connection
let orderRepository: OrderRepository
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clear()
})

test('Should return empty list of orders', async () => {
    const getOrders = new GetOrders(orderRepository)
    const output = await getOrders.execute()
    expect(output).toHaveLength(0)
})

test('Should return list of orders', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const placeOrder = new PlaceOrder(repositoryFactory)
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

    const getOrders = new GetOrders(orderRepository)
    const output = await getOrders.execute()
    const [order] = output
    expect(output).toHaveLength(1)
    expect(order.code).toBe('202100000001')
    expect(order.total).toBe(5132)
})

afterEach(async () => {
    await connection.close()
})